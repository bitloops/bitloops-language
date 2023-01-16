import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainCreateParameterNode } from '../../../../../../../ast/core/intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import { PropsNode } from '../../../../../../../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { ValueObjectDeclarationNode } from '../../../../../../../ast/core/intermediate-ast/nodes/valueObject/ValueObjectDeclarationNode.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { isProps, isVO } from '../../../../../../../helpers/typeGuards.js';
import {
  TTargetDependenciesTypeScript,
  TVariable,
  fieldKey,
  fieldsKey,
} from '../../../../../../../types.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';

// TODO TPropsValues were deleted, fix this
type TPropsValues = any;
const getVOProps = (voName: string, model: IntermediateASTTree): DomainCreateParameterNode => {
  const voModel = model.getRootChildrenNodesByType(
    BitloopsTypesMapping.TValueObject,
  ) as ValueObjectDeclarationNode[];

  const voModelFiltered = voModel.filter((vo) => vo.getIdentifier() === voName);
  const voCreate = voModelFiltered[0].getCreateNode();
  const voParameter = voCreate.getParameterNode();

  return voParameter;
};

const getPropsFields = (propsName: string, model: IntermediateASTTree): TVariable[] => {
  const propsNodes = model.getRootChildrenNodesByType(BitloopsTypesMapping.TProps) as PropsNode[];

  const propsWithIdentifier = propsNodes.find((props) => props.getIdentifierValue() === propsName);
  const propsFields = propsWithIdentifier.getFieldListNode();

  const { [fieldsKey]: propsFieldsValue } = propsFields.getValue();

  return propsFieldsValue;
};

const getVODeepFields = (
  voProps: DomainCreateParameterNode,
  model: IntermediateASTTree,
): string[] => {
  const voDeepFields = [];

  const params = Object.values(voProps.getValue())[0];
  const { identifier, parameterType } = params as any;

  if (isVO(parameterType)) {
    const nestedVOProps = getVOProps(parameterType, model);
    const nestedVOResult = getVODeepFields(nestedVOProps, model);
    const nestedFields = [];
    nestedVOResult.forEach((fieldsString) => {
      nestedFields.push(`${identifier}.${fieldsString}`);
    });
    voDeepFields.push(...nestedFields);
  } else if (isProps(parameterType)) {
    const propsFields = getPropsFields(parameterType, model);
    const nestedFields = [];
    propsFields.forEach((field) => {
      const { identifier: fieldsString } = field[fieldKey];
      nestedFields.push(`${fieldsString}`);
    });
    voDeepFields.push(...nestedFields);
  } else {
    voDeepFields.push(identifier);
  }

  return voDeepFields;
};

const getAggregateDeepFields = (
  aggregatePropsModel: TPropsValues,
  aggregateName: string,
  model: IntermediateASTTree,
): string => {
  return aggregatePropsModel['Props'].fields
    .filter((variable) => variable[fieldKey].identifier !== 'id')
    .map((variable) => {
      const { identifier: name, type } = variable[fieldKey];
      if ('bitloopsIdentifierType' in type) {
        const typeName = type['bitloopsIdentifierType'];

        if (isVO(typeName)) {
          const voProps = getVOProps(typeName, model);
          const deepFieldsVO = getVODeepFields(voProps, model);
          return deepFieldsVO
            .map((fieldsString) => {
              const splitFields = fieldsString.split('.');
              const voFieldName = splitFields[splitFields.length - 1];
              return `${voFieldName}: ${aggregateName}.${name}.${fieldsString}`;
            })
            .join(', ');
        }
      }
      // TODO check if is Entity and maybe get the id only
      return `${name}: ${aggregateName}.${name}`;
    })
    .join(', ');
};

const getAggregateIdVariable = (aggregatePropsModel: TPropsValues): TVariable => {
  const [aggregateIdVariable] = aggregatePropsModel['Props'].fields
    .filter((variable) => variable[fieldKey].identifier === 'id')
    .map((variable) => variable);
  return aggregateIdVariable;
};

export const fetchTypeScriptAggregateCrudBaseRepo = (
  entityName: string,
  aggregatePropsModel: TPropsValues,
  model: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const lowerCaseEntityName = (entityName.charAt(0).toLowerCase() + entityName.slice(1)).slice(
    0,
    entityName.length - 'Entity'.length,
  );

  const aggregateIdVariable = getAggregateIdVariable(aggregatePropsModel);
  const mappedAggregateType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: aggregateIdVariable[fieldKey].type },
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
