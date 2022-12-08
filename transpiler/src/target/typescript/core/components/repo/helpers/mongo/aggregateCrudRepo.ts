import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { isVO } from '../../../../../../../helpers/typeGuards.js';
import {
  TModule,
  TTargetDependenciesTypeScript,
  TVariable,
  fieldKey,
} from '../../../../../../../types.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from './../../../../type-identifiers/bitloopsPrimType.js';

// TODO TPropsValues where deleted, fix this
type TPropsValues = any;
const getVOProps = (voName: string, model: TModule): TPropsValues => {
  const voModel = model.ValueObject[voName];
  const voPropsNameType = voModel.create.parameter.type;
  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(voPropsNameType)) {
    throw new Error('Array props are not supported');
  }
  const { output: voPropsName } = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: voPropsNameType,
  });
  const voProps = model.Props[voPropsName];
  return voProps;
};

const getVODeepFields = (voProps: TPropsValues, model: TModule): string[] => {
  const voDeepFields = [];
  voProps.variables.forEach((variable) => {
    const { identifier, type } = variable[fieldKey];
    if (isVO(type)) {
      const nestedVOProps = getVOProps(type, model);
      const nestedVOResult = getVODeepFields(nestedVOProps, model);
      const nestedFields = [];
      nestedVOResult.forEach((fieldsString) => {
        nestedFields.push(`${identifier}.${fieldsString}`);
      });
      voDeepFields.push(...nestedFields);
    } else {
      voDeepFields.push(identifier);
    }
  });
  return voDeepFields;
};

const getAggregateDeepFields = (
  aggregatePropsModel: TPropsValues,
  aggregateName: string,
  model: TModule,
): string => {
  return aggregatePropsModel.variables
    .filter((variable) => variable[fieldKey].identifier !== 'id')
    .map((variable) => {
      const { identifier: name, type } = variable[fieldKey];
      if (isVO(type)) {
        const voProps = getVOProps(type, model);
        const deepFieldsVO = getVODeepFields(voProps, model);
        return deepFieldsVO
          .map((fieldsString) => {
            const splitFields = fieldsString.split('.');
            const voFieldName = splitFields[splitFields.length - 1];
            return `${voFieldName}: ${aggregateName}.${name}.${fieldsString}`;
          })
          .join(', ');
      }
      // TODO check if is Entity and maybe get the id only
      return `${name}: ${aggregateName}.${name}`;
    })
    .join(', ');
};

const getAggregateIdVariable = (aggregatePropsModel: TPropsValues): TVariable => {
  const [aggregateIdVariable] = aggregatePropsModel.variables
    .filter((variable) => variable[fieldKey].identifier === 'id')
    .map((variable) => variable);
  return aggregateIdVariable;
};

export const fetchTypeScriptAggregateCrudBaseRepo = (
  entityName: string,
  aggregatePropsModel: TPropsValues,
  model: TModule,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const lowerCaseEntityName = (entityName.charAt(0).toLowerCase() + entityName.slice(1)).slice(
    0,
    entityName.length - 'Entity'.length,
  );

  const aggregateIdVariable = getAggregateIdVariable(aggregatePropsModel);
  const mappedAggregateType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: aggregateIdVariable[fieldKey].type,
  });

  const deepFields = getAggregateDeepFields(aggregatePropsModel, lowerCaseEntityName, model);

  const aggregateRootId = lowerCaseEntityName + 'Id';
  const output = `
    async getAll(): Promise<${entityName}[]> {
      throw new Error('Method not implemented.');
    }
    async getById(${aggregateRootId}: ${mappedAggregateType.output}): Promise<${entityName}> {
      return (await this.collection.findOne({
        _id: ${aggregateRootId}.toString(),
      })) as unknown as ${entityName};
    }
    async delete(${aggregateRootId}: ${mappedAggregateType.output}): Promise<void> {
      await this.collection.deleteOne({
        _id: ${aggregateRootId}.toString(),
      });
    }
    async save(${lowerCaseEntityName}: ${entityName}): Promise<void> {
      await this.collection.insertOne({
        _id: ${lowerCaseEntityName}.id.toString() as unknown as Mongo.ObjectId,
        ${deepFields}
      });
    }
    async update(${lowerCaseEntityName}: ${entityName}): Promise<void> {
      await this.collection.updateOne(
        {
          _id: ${lowerCaseEntityName}.id.toString(),
        },
        {
          $set: {
        ${deepFields}
          },
        },
      );
    }
    `;
  const entityNameDependency = getChildDependencies(entityName);
  dependencies = [...dependencies, ...entityNameDependency, ...mappedAggregateType.dependencies];
  return {
    output,
    dependencies,
  };
};
