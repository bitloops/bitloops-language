import {
  TSetupData,
  repoSupportedTypes,
  TRepoConnectionInfo,
  TReposSetup,
  TRepoSupportedTypes,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { TSetupOutput } from '../index.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';

type TCategorizedRepoConnections = Record<
  TRepoSupportedTypes,
  {
    [connectionName: string]: TRepoConnectionInfo;
  }
>;

const dependenciesMap: Record<TRepoSupportedTypes, { packageName: string; version: string }> = {
  'DB.Mongo': {
    packageName: '@bitloops/bl-boilerplate-infra-mongo',
    version: '*',
  },
  'DB.MySQL': {
    packageName: '@bitloops/bl-boilerplate-infra-mysql',
    version: '*',
  },
  'DB.Postgres': {
    packageName: '@bitloops/bl-boilerplate-infra-pg',
    version: '*',
  },
  'DB.SQLite': {
    packageName: '@bitloops/bl-boilerplate-infra-sqlite3',
    version: '*',
  },
};

export interface ISetupRepos {
  generateRepoConnections(setupData: Readonly<TSetupData>): TSetupOutput[];
  getStartupImports(
    reposSetupData: Readonly<TReposSetup>,
    setupTypeMapper: Record<string, string>,
  ): string[];
  generateRepoDIImports(
    reposSetupData: Readonly<TReposSetup>,
    setupTypeMapper: Record<string, string>,
  ): string;
  generateRepoDIAdapters(
    reposSetupData: Readonly<TReposSetup>,
    // boundedContext: string,
    // module: string,
  ): string;
  getPackageJSONDependencies(reposSetupData: Readonly<TReposSetup>): Record<string, string>;
}

export class SetupTypeScriptRepos implements ISetupRepos {
  // private dbTypeToFolderMap: Record<TRepoSupportedTypes, string> = {
  //   mongodb: 'mongo',
  //   postgres: 'postgres',
  //   mysql: 'mysql',
  //   sqlite: 'sqlite',
  // };

  generateRepoConnections(setupData: Readonly<TSetupData>, license?: string): TSetupOutput[] {
    if (!setupData?.repos?.connections) return [];
    const groupedConnectionsPerDb = this.groupRepoConnectionsPerDbType(setupData.repos);
    return Object.entries(groupedConnectionsPerDb).reduce((acc, [dbType, connections]) => {
      const results = this.getDbTypeRepoConnectionsPathsAndContent(
        dbType as TRepoSupportedTypes,
        connections,
        license,
      );
      acc.push(...results);
      return acc;
    }, [] as TSetupOutput[]);
  }

  getStartupImports(repos: Readonly<TReposSetup>, setupTypeMapper): string[] {
    const dbTypes = new Set<TRepoSupportedTypes>();
    if (!repos?.connections) return [];
    const result: string[] = [];
    for (const connectionInfo of Object.values(repos.connections)) {
      dbTypes.add(connectionInfo.connectionValues.dbType);
    }
    dbTypes.forEach((dbType) => {
      result.push(`await import('..${setupTypeMapper[dbType]}');`);
    });

    return result;
  }

  generateRepoDIImports(
    reposSetupData: Readonly<TReposSetup>,
    setupTypeMapper: Record<string, string>,
  ): string {
    const moduleRepoAdapters = reposSetupData?.repoAdapters?.repoAdapterValues;
    if (!moduleRepoAdapters) return '';
    const connections: Record<TRepoSupportedTypes, string[]> = {
      'DB.Mongo': [],
      'DB.Postgres': [],
      'DB.MySQL': [],
      'DB.SQLite': [],
    };
    const adapterImports: string[] = [];
    for (const [adapterClassName, repoAdapterInfo] of Object.entries(moduleRepoAdapters)) {
      const { connection, dbType } = repoAdapterInfo;
      const stringConnection = modelToTargetLanguage({
        type: BitloopsTypesMapping.TSingleExpression,
        value: connection,
      });
      connections[dbType].push(stringConnection.output);
      // const adapterClassName = getRepoAdapterClassName(repoPort, dbType);
      adapterImports.push(
        `import { ${adapterClassName} } from './repos/concretions/${adapterClassName}';`,
      );
    }

    const result = Object.entries(connections).reduce((acc, [dbType, connectionNames]) => {
      if (connectionNames.length === 0) return acc;

      const connectionImports = connectionNames
        .sort()
        .filter((item: string, pos: number) => {
          return connectionNames.indexOf(item) == pos;
        })
        .join(', ');

      acc.push(
        `import { ${connectionImports} } from '../../../..${setupTypeMapper[dbType]}config';`,
      );
      return acc;
    }, [] as string[]);
    result.push(...adapterImports);
    return result.join('\n') + '\n';
  }

  generateRepoDIAdapters(reposSetupData: Readonly<TReposSetup>): string {
    const repoAdapterValues = reposSetupData?.repoAdapters.repoAdapterValues;
    if (!repoAdapterValues) return '';
    const result: string[] = [];
    for (const [adapterClassName, repoAdapterInfo] of Object.entries(repoAdapterValues)) {
      const { connection, instanceIdentifier } = repoAdapterInfo;
      const stringConnection = modelToTargetLanguage({
        type: BitloopsTypesMapping.TSingleExpression,
        value: connection,
      });

      result.push(
        `const ${instanceIdentifier} = new ${adapterClassName}(${stringConnection.output});`,
      );
    }
    return result.join('\n') + '\n';
  }

  getPackageJSONDependencies(reposSetupData: Readonly<TReposSetup>): Record<string, string> {
    if (!reposSetupData) return {};
    const groupedConnections = this.groupRepoConnectionsPerDbType(reposSetupData);
    const result = {};
    for (const [dbType, connections] of Object.entries(groupedConnections)) {
      if (Object.keys(connections).length === 0) continue;
      const { packageName, version } = dependenciesMap[dbType as TRepoSupportedTypes];
      result[packageName] = version;
    }
    return result;
  }

  private groupRepoConnectionsPerDbType(repos: Readonly<TReposSetup>): TCategorizedRepoConnections {
    if (!repos.connections) {
      return repoSupportedTypes.reduce((acc, dbType) => {
        acc[dbType] = {};
        return acc;
      }, {} as TCategorizedRepoConnections);
    }
    const connections: {
      [connectionName: string]: TRepoConnectionInfo;
    } = JSON.parse(JSON.stringify(repos.connections));

    return Object.entries(connections).reduce((acc, [connectionName, connectionInfo]) => {
      if (!acc[connectionInfo.dbType]) {
        acc[connectionInfo.dbType] = {};
      }
      acc[connectionInfo.dbType][connectionName] = connectionInfo;
      return acc;
    }, {} as TCategorizedRepoConnections);
  }

  private getDbTypeRepoConnectionsPathsAndContent(
    dbType: TRepoSupportedTypes,
    connections: {
      [connectionName: string]: TRepoConnectionInfo;
    },
    license?: string,
  ): TSetupOutput[] {
    let content = '';

    let indexContent = '';
    switch (dbType) {
      case 'DB.Mongo': {
        // TODO handle mongo user, pass etc
        content += "import { MongoClient } from 'mongodb';\n";

        content += Object.entries(connections)
          .map(([connectionName, connectionInfo]) => {
            const { host, port } = connectionInfo;
            const transpiledHostExpr = modelToTargetLanguage({
              type: BitloopsTypesMapping.TSingleExpression,
              value: host,
            });
            const transpiledPortExpr = modelToTargetLanguage({
              type: BitloopsTypesMapping.TSingleExpression,
              value: port,
            });
            return (
              `const ${connectionName}Url = 'mongodb://' + ${transpiledHostExpr.output} + ':${transpiledPortExpr.output}';\n` +
              `export const ${connectionName} = new MongoClient(${connectionName}Url);\n`
            );
          })
          .join('\n');
        indexContent = this.getMongoIndexFileContent(Object.keys(connections), license);
        break;
      }
      default:
        throw new Error('Not implemented yet' + dbType);
    }
    // const dbPath = this.dbTypeToFolderMap[dbType];
    return [
      {
        fileId: 'config.ts',
        fileType: `${dbType}.Config`,
        content: (license || '') + content,
      },
      {
        fileId: 'index.ts',
        fileType: `${dbType}.Index`,
        content: (license || '') + indexContent,
      },
    ];
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
