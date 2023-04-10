import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../../../helpers/mappings.js';
import {
  TTargetDependenciesTypeScript,
  TVariable,
  fieldKey,
  TProps,
} from '../../../../../../../types.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { getGettersMethodImplementation } from './getByFieldsMethods.js';

const getAggregateIdVariable = (aggregatePropsModel: TProps): TVariable => {
  const [aggregateIdVariable] = aggregatePropsModel['Props'].fields
    .filter((variable) => variable[fieldKey].identifier === 'id')
    .map((variable) => variable);
  return aggregateIdVariable;
};

export const fetchAggregateCrudBaseRepo = (
  entityName: string,
  aggregatePropsModel: TProps,
  model: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const lowerCaseEntityName = (entityName.charAt(0).toLowerCase() + entityName.slice(1)).slice(
    0,
    entityName.length - 'Entity'.length,
  );

  const aggregateIdVariable = getAggregateIdVariable(aggregatePropsModel);
  const aggregateIdType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: aggregateIdVariable[fieldKey].type },
  });

  const getByFields = getGettersMethodImplementation(entityName, model, ClassTypes.RootEntity);

  const aggregateRootId = lowerCaseEntityName + 'Id';
  const output = `
    async getAll(): Promise<${entityName}[]> {
      throw new Error('Method not implemented.');
    }
    async getById(${aggregateRootId}: ${aggregateIdType.output}): Promise<${entityName} | null> {
      const res = await this.collection.findOne({
        _id: ${aggregateRootId}.toString(),
      });
      if (!res) {
        return null;
      }
      const { _id, ...rest } = res as any;
      return ${entityName}.fromPrimitives({
        id: _id,
        ...rest,
      });
    }
    async delete(${aggregateRootId}: ${aggregateIdType.output}): Promise<void> {
      await this.collection.deleteOne({
        _id: ${aggregateRootId}.toString(),
      });
    }
    async save(${lowerCaseEntityName}: ${entityName}): Promise<void> {
      const {id, ...rest} = ${lowerCaseEntityName}.toPrimitives();
      await this.collection.insertOne({
        _id: id as unknown as Mongo.ObjectId,
        ...rest,
      });
      await Domain.dispatchEventsCallback(${lowerCaseEntityName}.id);
    }
    async update(${lowerCaseEntityName}: ${entityName}): Promise<void> {
      const {id, ...rest} = ${lowerCaseEntityName}.toPrimitives();
      await this.collection.updateOne(
        {
          _id: id,
        },
        {
          $set: rest,
        },
      );
      await Domain.dispatchEventsCallback(${lowerCaseEntityName}.id);
    }
    ${getByFields}
    `;
  const entityNameDependency = getChildDependencies(entityName);
  dependencies = [...dependencies, ...entityNameDependency, ...aggregateIdType.dependencies];
  return {
    output,
    dependencies,
  };
};
