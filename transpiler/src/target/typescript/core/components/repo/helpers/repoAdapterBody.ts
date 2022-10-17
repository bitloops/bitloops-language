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
import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import { TRepoSupportedTypes, TRepoPort } from '../../../../../../types.js';

const CRUDRepoPort = 'CRUDRepoPort';

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

const repoBodyLangMapping = {
  [SupportedLanguages.TypeScript]: (
    dbType: TRepoSupportedTypes,
    collection: string,
    repoPortInfo: TRepoPort,
  ): string => {
    switch (dbType) {
      case 'mongodb': {
        let result = `constructor(private client: MongoClient) { this.collection = ${collection}; }`;
        if (repoPortInfo.extendedRepoPorts.includes(CRUDRepoPort)) {
          result += fetchTypeScriptMongoCrudBaseRepo(repoPortInfo.aggregateRootName);
        }
        return result;
      }
      default: {
        throw new Error(`Unsupported db type: ${dbType}`);
      }
    }
  },
};
export { repoBodyLangMapping };
