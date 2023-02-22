import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../../../helpers/mappings.js';
import {
  TVariable,
  TTargetDependenciesTypeScript,
  fieldKey,
  TReadModel,
  TProps,
} from '../../../../../../../types.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { getGettersMethodImplementation } from './getByFieldsMethods.js';

const DOCUMENT_NAME = 'document';

const getReadModelIdVariable = (readModelValues: TProps | TReadModel): TVariable => {
  const [aggregateIdVariable] = readModelValues['ReadModel'].fields
    .filter((variable) => variable[fieldKey].identifier === 'id')
    .map((variable) => variable);
  return aggregateIdVariable;
};

export const fetchReadModelCrudBaseRepo = (
  readModelName: string,
  readModelValues: TProps | TReadModel,
  model: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const lowerCaseReadModelName = (
    readModelName.charAt(0).toLowerCase() + readModelName.slice(1)
  ).slice(0, readModelName.length - 'ReadModel'.length);

  const readModelIdVariable = getReadModelIdVariable(readModelValues);
  const mappedReadModelIdType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: readModelIdVariable[fieldKey].type },
  });

  const gettersMethodImplementation = getGettersMethodImplementation(
    readModelName,
    model,
    ClassTypes.ReadModel,
  );

  const readModelId = lowerCaseReadModelName + 'Id';
  const output = `
      async getAll(): Promise<${readModelName}[]> {
        const documents = await this.collection.find({}).toArray();
        const res: ${readModelName}[] = [];
        documents.forEach((${DOCUMENT_NAME}) => {
          const { _id, ...rest } = ${DOCUMENT_NAME};
            res.push(
              ${readModelName}.fromPrimitives({
                id: _id,
                ...rest,
              })
              );
        });
        return res;
      }
      async getById(${readModelId}: ${mappedReadModelIdType.output}): Promise<${readModelName} | null> {
        const ${DOCUMENT_NAME} = await this.collection.findOne({
            _id: ${readModelId},
        });
        if (!${DOCUMENT_NAME}) {
          return null;
        }
        const { _id, ...rest } = ${DOCUMENT_NAME};
        return ${readModelName}.fromPrimitives({
          id: _id,
          ...rest,
        });
      }
      ${gettersMethodImplementation}
      `;

  const entityNameDependency = getChildDependencies(readModelName);
  dependencies = [...dependencies, ...entityNameDependency, ...mappedReadModelIdType.dependencies];
  return {
    output,
    dependencies,
  };
};
