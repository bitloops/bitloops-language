/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import {
  TRepoAdapters,
  TRepoSupportedTypes,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';

export const repoAdapterToTargetLanguage = (
  repoAdapters: TRepoAdapters,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const importMapping = {
    [SupportedLanguages.TypeScript]: (dbType: TRepoSupportedTypes) => {
      switch (dbType) {
        case 'DB.Mongo': {
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
    generatedCollectionExpression.output,
    repoPortInfo,
  );
  const repoEnd = finalLangMapping[targetLanguage]();
  return {
    output: repoImports + repoStart + repoBody + repoEnd,
    dependencies: generatedCollectionExpression.dependencies,
  };
};
