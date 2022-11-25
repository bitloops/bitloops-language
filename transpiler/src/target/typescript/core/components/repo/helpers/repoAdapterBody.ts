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
import {
  TRepoSupportedTypes,
  TRepoPort,
  TTargetDependenciesTypeScript,
  TSingleExpression,
  TPropsValues,
  TModule,
  ISetupData,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { fetchTypeScriptAggregateCrudBaseRepo } from './mongo/aggregateCrudRepo.js';
import { fetchTypeScriptReadModelCrudBaseRepo } from './mongo/readModelCrudRepo.js';

const CRUDWriteRepoPort = 'CRUDWriteRepoPort';
const CRUDReadRepoPort = 'CRUDReadRepoPort';

const repoBodyLangMapping = (
  dbType: TRepoSupportedTypes,
  collectionExpression: TSingleExpression,
  connectionExpression: TSingleExpression,
  repoPortInfo: TRepoPort,
  propsModel: TPropsValues,
  model: TModule,
  setupData: ISetupData,
): TTargetDependenciesTypeScript => {
  const collection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: collectionExpression,
  });
  const connection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: connectionExpression,
  });
  const { database } = setupData.repos.connections[connection.output];
  const dbName = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: database,
  });

  let dependencies = [
    ...collection.dependencies,
    ...connection.dependencies,
    ...dbName.dependencies,
  ];
  let result = '';
  switch (dbType) {
    case 'DB.Mongo': {
      result = `constructor(private client: Mongo.Client) { 
        const dbName = ${dbName.output};
      const collection = ${collection.output};
      this.collection = this.client.db(dbName).collection(collection);
     }`;
      if (repoPortInfo.extendedRepoPorts.includes(CRUDWriteRepoPort)) {
        const methodsResult = fetchTypeScriptAggregateCrudBaseRepo(
          repoPortInfo.aggregateRootName,
          propsModel,
          model,
        );
        result += methodsResult.output;
        dependencies = [...dependencies, ...methodsResult.dependencies];
      } else if (repoPortInfo.extendedRepoPorts.includes(CRUDReadRepoPort)) {
        const methodsResult = fetchTypeScriptReadModelCrudBaseRepo(
          repoPortInfo.readModelName,
          propsModel,
        );
        result += methodsResult.output;
        dependencies = [...dependencies, ...methodsResult.dependencies];
      }
      break;
    }
    default: {
      throw new Error(`Unsupported db type: ${dbType}`);
    }
  }
  return {
    output: result,
    dependencies,
  };
};
export { repoBodyLangMapping };
