import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TRepoAdapters, TRepoSupportedTypes } from '../../../types.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';
import { modelToTargetLanguage } from '../index.js';
import { BitloopsTypesMapping } from '../commons/index.js';

export const repoAdapterToTargetLanguage = (
  repoAdapters: TRepoAdapters,
  targetLanguage: string,
): string => {
  const importMapping = {
    [SupportedLanguages.TypeScript]: (dbType: TRepoSupportedTypes) => {
      switch (dbType) {
        case 'mongodb': {
          return "import { MongoClient } from 'mongodb';";
        }
        default: {
          throw new Error(`Unsupported db type: ${dbType}`);
        }
      }
    },
  };
  const initialLangMapping = {
    [SupportedLanguages.TypeScript]: (interfaceName: string, dbType: TRepoSupportedTypes) =>
      // TODO import mongo collection
      `export class ${getRepoAdapterClassName(
        interfaceName,
        dbType,
      )} implements ${interfaceName} { private collection:string; `,
  };

  const repoAdapterInstanceName = Object.keys(repoAdapters)[0];
  const repoAdapter = repoAdapters[repoAdapterInstanceName];

  const { dbType, repoPort, repoPortInfo, connection: _connection, collection } = repoAdapter;
  const repoImports = importMapping[targetLanguage](dbType);
  const repoStart = initialLangMapping[targetLanguage](repoPort, dbType);

  const finalLangMapping = {
    [SupportedLanguages.TypeScript]: () => '}',
  };
  const generatedCollectionExpression = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: collection,
  });
  const repoBody = repoBodyLangMapping[targetLanguage](
    dbType,
    generatedCollectionExpression,
    repoPortInfo,
  );
  const repoEnd = finalLangMapping[targetLanguage]();
  return repoImports + repoStart + repoBody + repoEnd;
};
