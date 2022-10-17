import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import { TRepoPort, TRepoSupportedTypes } from '../../../../types.js';

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
