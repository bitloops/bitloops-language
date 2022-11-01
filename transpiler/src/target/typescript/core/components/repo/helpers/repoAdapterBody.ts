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
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const CRUDWriteRepoPort = 'CRUDWriteRepoPort';
// const CRUDReadRepoPort = 'CRUDReadRepoPort';

const fetchTypeScriptMongoCrudBaseRepo = (entityName: string) => {
  return `async getAll(): Promise<${entityName}[]> {
    throw new Error('Method not implemented.');
  }
  async getById(aggregateRootId: string): Promise<${entityName}> {
    throw new Error('Method not implemented.');
  }
  async save(aggregateRootId:  ${entityName}): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(aggregate:  ${entityName}): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(aggregateRootId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  `;
};

const repoBodyLangMapping = (
  dbType: TRepoSupportedTypes,
  collectionExpression: TSingleExpression,
  repoPortInfo: TRepoPort,
): TTargetDependenciesTypeScript => {
  const collection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TSingleExpression,
    value: collectionExpression,
  });
  const dependencies = [...collection.dependencies];
  let result = '';
  switch (dbType) {
    case 'DB.Mongo': {
      result = `constructor(private client: Mongo.Client) { this.collection = ${collection.output}; }`;
      if (repoPortInfo.extendedRepoPorts.includes(CRUDWriteRepoPort)) {
        result += fetchTypeScriptMongoCrudBaseRepo(repoPortInfo.aggregateRootName);
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
