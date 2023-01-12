import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { RepoConnectionOptions, TRepoConnectionOptions } from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { NodeValueHelpers } from '../helpers.js';

type GenerateRepoConfigParams = {
  [connectionName: string]: TRepoConnectionOptions;
};

export interface ISetupTypescriptMongoRepo {
  generateConnectionConfigFile(
    connections: GenerateRepoConfigParams,
    license?: string,
  ): {
    configFileContent: string;
    indexFileContent: string;
  };
}

export class SetupTypescriptMongoRepo implements ISetupTypescriptMongoRepo {
  generateConnectionConfigFile(
    connections: GenerateRepoConfigParams,
    license?: string,
  ): {
    configFileContent: string;
    indexFileContent: string;
  } {
    let content: string;

    content += "import { MongoClient } from 'mongodb';\n";

    content += Object.entries(connections)
      .map(([connectionName, connectionInfo]) => {
        const { options } = connectionInfo;
        const host = NodeValueHelpers.findKeyOfEvaluationFieldList(
          options,
          RepoConnectionOptions.host,
        );
        const port = NodeValueHelpers.findKeyOfEvaluationFieldList(
          options,
          RepoConnectionOptions.port,
        );
        const transpiledHostExpr = modelToTargetLanguage({
          type: BitloopsTypesMapping.TExpression,
          value: host,
        });
        const transpiledPortExpr = modelToTargetLanguage({
          type: BitloopsTypesMapping.TExpression,
          value: port,
        });
        return (
          `const ${connectionName}Url = 'mongodb://' + ${transpiledHostExpr.output} + ':${transpiledPortExpr.output}';\n` +
          `export const ${connectionName} = new MongoClient(${connectionName}Url);\n`
        );
      })
      .join('\n');
    const indexContent = this.getMongoIndexFileContent(Object.keys(connections), license);
    return {
      configFileContent: content,
      indexFileContent: indexContent,
    };
  }

  private getMongoIndexFileContent(mongoConnectionInstances: string[], license?: string): string {
    const connectionClients = mongoConnectionInstances.join(', ');
    const connectClients =
      'await Promise.all(connections.map((connection) => connection.connect()));';
    return (
      (license || '') +
      `import { ${connectionClients} } from './config';

const connect = async () => {
  try {
    console.info('Connecting to Mongo...');
    const connections = [${connectionClients}];
    ${connectClients}
    console.info('Connected successfully to MongoDB server');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connect();
`
    );
  }
}
