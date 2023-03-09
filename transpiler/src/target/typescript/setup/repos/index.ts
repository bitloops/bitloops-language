import {
  TRepoSupportedTypes,
  TRepoConnectionDefinition,
  RepoConnectionDefinitionKey,
  RepoConnectionExpressionKey,
  TRepoConnectionOptions,
  TSetupRepoAdapterDefinition,
  RepoAdapterOptions,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { TSetupOutput } from '../index.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { SetupTypescriptMongoRepo } from './mongo.js';
import { NodeValueHelpers } from '../helpers.js';
import { TRepoAdapter, TRepoAdapters } from '../definitions.js';
import { BL_BOILERPLATE_INFRA_DB_MONGO } from '../package-template.js';

type TCategorizedRepoConnections = Record<
  TRepoSupportedTypes,
  {
    [connectionName: string]: TRepoConnectionOptions;
  }
>;

const dependenciesMap: Record<TRepoSupportedTypes, { [packageName: string]: string }> = {
  'DB.Mongo': BL_BOILERPLATE_INFRA_DB_MONGO,
  'DB.MySQL': {
    '@bitloops/bl-boilerplate-infra-mysql': '*',
  },
  'DB.Postgres': {
    '@bitloops/bl-boilerplate-infra-pg': '*',
  },
  'DB.SQLite': {
    '@bitloops/bl-boilerplate-infra-sqlite3': '*',
  },
};

export interface ISetupRepos {
  getStartupImports(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
    setupTypeMapper: Record<string, string>,
  ): string[];

  generateRepoConnections(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
    license?: string,
  ): TSetupOutput[];
  generateRepoDIImports(
    repoAdapters: Readonly<TRepoAdapter[]>,
    setupTypeMapper: Record<string, string>,
  ): string;
  generateRepoDIAdapters(
    repoAdapters: Readonly<TRepoAdapter[]>,
    // boundedContext: string,
    // module: string,
  ): string;
  getPackageJSONDependencies(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
  ): Record<string, string>;
}

export class SetupTypeScriptRepos implements ISetupRepos {
  generateRepoConnections(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
    license?: string,
  ): TSetupOutput[] {
    // if (!setupData?.repos?.connections) return [];
    const groupedConnectionsPerDb = this.groupRepoConnectionsPerDbType(repoConnectionDefinitions);
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

  getStartupImports(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
    setupTypeMapper,
  ): string[] {
    const dbTypes = new Set<TRepoSupportedTypes>();
    const result: string[] = [];
    for (const connection of repoConnectionDefinitions) {
      const dbType = connection[RepoConnectionDefinitionKey][RepoConnectionExpressionKey].dbType;
      dbTypes.add(dbType);
    }
    dbTypes.forEach((dbType) => {
      result.push(`await import('..${setupTypeMapper[dbType]}');`);
    });

    return result;
  }

  generateRepoDIImports(
    repoAdapters: Readonly<TRepoAdapter[]>,
    setupTypeMapper: Record<string, string>,
  ): string {
    if (repoAdapters.length === 0) return '';
    const connections: Record<TRepoSupportedTypes, string[]> = {
      'DB.Mongo': [],
      'DB.Postgres': [],
      'DB.MySQL': [],
      'DB.SQLite': [],
    };
    const adapterImports: string[] = [];
    for (const repoAdapter of repoAdapters) {
      const { repoAdapterExpression, instanceName } = repoAdapter;
      const { repoAdapterClassName, repoAdapterOptions, dbType } = repoAdapterExpression;
      const connection = NodeValueHelpers.findKeyOfEvaluationFieldList(
        repoAdapterOptions,
        RepoAdapterOptions.connection,
      );
      const stringConnection = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpression,
        value: connection,
      });
      connections[dbType].push(stringConnection.output);
      adapterImports.push(
        `import { ${repoAdapterClassName} } from './repos/concretions/${instanceName}';`,
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

  generateRepoDIAdapters(repoAdapters: Readonly<TRepoAdapter[]>): string {
    if (repoAdapters.length === 0) return '';
    const result: string[] = [];
    for (const repoAdapter of repoAdapters) {
      const { instanceName, repoAdapterExpression } = repoAdapter;
      const { repoAdapterClassName, repoAdapterOptions } = repoAdapterExpression;
      const connection = NodeValueHelpers.findKeyOfEvaluationFieldList(
        repoAdapterOptions,
        RepoAdapterOptions.connection,
      );
      const stringConnection = modelToTargetLanguage({
        type: BitloopsTypesMapping.TExpression,
        value: connection,
      });

      result.push(
        `const ${instanceName} = new ${repoAdapterClassName}(${stringConnection.output});`,
      );
    }
    return result.join('\n') + '\n';
  }

  getPackageJSONDependencies(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
  ): Record<string, string> {
    let result = {};
    for (const connectionDefinition of repoConnectionDefinitions) {
      const dbType =
        connectionDefinition[RepoConnectionDefinitionKey][RepoConnectionExpressionKey].dbType;
      result = {
        ...result,
        ...dependenciesMap[dbType],
      };
    }
    return result;
  }

  private groupRepoConnectionsPerDbType(
    repoConnectionDefinitions: TRepoConnectionDefinition[],
  ): Partial<TCategorizedRepoConnections> {
    // const initialStruct: TCategorizedRepoConnections = repoSupportedTypes.reduce((acc, dbType) => {
    //   acc[dbType] = {};
    //   return acc;
    // }, {} as TCategorizedRepoConnections);

    const connectionsGroupedByDbType = repoConnectionDefinitions.reduce(
      (acc, repoConnectionDefinition) => {
        const connectionName = repoConnectionDefinition[RepoConnectionDefinitionKey].identifier;
        const connectionExpression =
          repoConnectionDefinition[RepoConnectionDefinitionKey][RepoConnectionExpressionKey];
        const { dbType, options } = connectionExpression;
        if (!acc[dbType]) acc[dbType] = {};
        acc[dbType][connectionName] = { options };
        return acc;
      },
      {},
    );

    return connectionsGroupedByDbType;
  }

  private getDbTypeRepoConnectionsPathsAndContent(
    dbType: TRepoSupportedTypes,
    connections: {
      [connectionName: string]: TRepoConnectionOptions;
    },
    license?: string,
  ): TSetupOutput[] {
    let content = '';

    let indexContent = '';
    switch (dbType) {
      case 'DB.Mongo': {
        const mongoGenerator = new SetupTypescriptMongoRepo();
        const { configFileContent, indexFileContent } =
          mongoGenerator.generateConnectionConfigFile(connections);
        content = configFileContent;
        indexContent = indexFileContent;
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

  static getRepoAdaptersForEachBoundedContextModule(
    repoAdapterDefinitions: Readonly<TSetupRepoAdapterDefinition[]>,
  ): TRepoAdapters {
    const repoAdapters: TRepoAdapters = {};
    for (const useCase of repoAdapterDefinitions) {
      const { setupRepoAdapterDefinition } = useCase;
      const { identifier, repoAdapterExpression } = setupRepoAdapterDefinition;
      const { boundedContextModule } = repoAdapterExpression;
      const { boundedContextName, moduleName } = boundedContextModule;
      const { wordsWithSpaces: boundedContext } = boundedContextName;
      const { wordsWithSpaces: module } = moduleName;

      if (!repoAdapters[boundedContext]) {
        repoAdapters[boundedContext] = {
          [module]: [
            {
              instanceName: identifier,
              repoAdapterExpression,
            },
          ],
        };
      } else if (!repoAdapters[boundedContext][module]) {
        repoAdapters[boundedContext][module] = [
          {
            instanceName: identifier,
            repoAdapterExpression,
          },
        ];
      } else {
        repoAdapters[boundedContext][module].push({
          instanceName: identifier,
          repoAdapterExpression,
        });
      }
    }
    return repoAdapters;
  }
}
