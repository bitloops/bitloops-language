import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import {
  TVariable,
  TTargetDependenciesTypeScript,
  fieldKey,
  TReadModel,
  TProps,
} from '../../../../../../../types.js';
import { getChildDependencies } from '../../../../dependencies.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';

const DOCUMENT_NAME = 'document';

const getReadModelFields = (readModelValues: TProps | TReadModel): string => {
  return readModelValues['ReadModel'].fields
    .filter((variable) => variable[fieldKey].identifier !== 'id')
    .map((variable) => {
      const { identifier } = variable[fieldKey];
      return `${identifier}: ${DOCUMENT_NAME}.${identifier}`;
    })
    .join(', ');
};

const getReadModelIdVariable = (readModelValues: TProps | TReadModel): TVariable => {
  const [aggregateIdVariable] = readModelValues['ReadModel'].fields
    .filter((variable) => variable[fieldKey].identifier === 'id')
    .map((variable) => variable);
  return aggregateIdVariable;
};

export const fetchTypeScriptReadModelCrudBaseRepo = (
  readModelName: string,
  readModelValues: TProps | TReadModel,
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

  const readModelFields = getReadModelFields(readModelValues);

  const readModelId = lowerCaseReadModelName + 'Id';
  const output = `
      async getAll(): Promise<${readModelName}[]> {
        const documents = await this.collection.find({}).toArray();
        const res: ${readModelName}[] = [];
        documents.forEach((${DOCUMENT_NAME}) => {
            res.push({
                id: ${DOCUMENT_NAME}._id.toString(),
                ${readModelFields}
            });
        });
        return res;
      }
      async getById(${readModelId}: ${mappedReadModelIdType.output}): Promise<${readModelName}> {
        const ${DOCUMENT_NAME} = await this.collection.findOne({
            _id: ${readModelId},
        });
        let res = null
        if (${DOCUMENT_NAME}) {
            res = {
                id: ${DOCUMENT_NAME}._id.toString(), 
                ${readModelFields}
            };
        }
        return res;
      }
      `;

  const entityNameDependency = getChildDependencies(readModelName);
  dependencies = [...dependencies, ...entityNameDependency, ...mappedReadModelIdType.dependencies];
  return {
    output,
    dependencies,
  };
};
