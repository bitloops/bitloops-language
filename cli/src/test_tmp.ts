import { ControllerTypeOfDefinition, ISetupData } from './types.js';
// import { parseBitloops } from './functions/bitloopsLanguageToModel/bitloops-parser/core/BitloopsParser.js';
import main from './functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupVisitor/main.js';

// import { parseBitloops } from './functions/bitloopsLanguageToModel/bitloops-parser/setup/BitloopsSetupParser.js';

const testValue = `const mongoConnection = RepoConnections.Mongo({
  host: 'localhost',
  port: 27017,
  database: 'todo',
})


const todoRepo = RepoAdapters.Mongo({
  connection: mongoConnection,
  collection: 'todos',
}) concretes [Demo][Hello World]TodoRepoPort;

`;

// const response = parseBitloops(testValue);
const response = main(testValue);
console.log('response:', JSON.stringify(response, null, 2));

export const output: ISetupData = {
  setup: {
    language: 'TypeScript',
    routers: {
      'REST.Fastify': {
        helloWorldRESTRouter: {
          methodURLMap: {
            'GET /hello': {
              controllerClass: 'HelloWorldController',
              boundedContext: 'Demo',
              module: 'Hello World',
            },
          },
        },
      },
    },
    servers: {
      'REST.Fastify': {
        serverInstances: [
          {
            port: {
              expression: {
                logicalExpression: {
                  orExpression: {
                    left: {
                      expression: {
                        envVariable: {
                          value: 'env.FASTIFY_PORT',
                        },
                      },
                    },
                    right: {
                      expression: {
                        literal: {
                          type: 'number',
                          value: '5001',
                        },
                      },
                    },
                  },
                },
              },
            },
            apiPrefix: '/api',
            routers: {
              helloWorldRESTRouter: {
                routerPrefix: '/say',
              },
            },
          },
        ],
      },
    },
  },
  repos: {
    connections: {
      mongoConnection: {
        host: {
          expression: {
            literal: {
              type: 'string',
              value: 'localhost',
            },
          },
        },
        port: {
          expression: {
            literal: {
              type: 'number',
              value: '27017',
            },
          },
        },
        database: {
          expression: {
            literal: {
              type: 'string',
              value: 'todo',
            },
          },
        },
        dbType: 'mongodb',
      },
    },
    repoAdapters: {
      Demo: {
        'Hello World': {
          todoRepo: {
            collection: {
              expression: {
                literal: {
                  type: 'string',
                  value: 'todos',
                },
              },
            },
            connection: {
              expression: {
                identifier: {
                  value: 'mongoConnection',
                },
              },
            },
            repoPort: 'TodoRepoPort',
            dbType: 'mongodb',
          },
        },
      },
    },
  },
  controllers: {
    Demo: {
      'Hello World': {
        HelloWorldController: {
          type: 'rest' as ControllerTypeOfDefinition.REST,
          method: 'GET',
          serverType: 'REST.Fastify',
          instances: [
            {
              url: '/hello',
              controllerInstance: 'helloWorldController',
              dependencies: ['myUseCase'],
            },
          ],
        },
      },
    },
  },
  useCases: {
    Demo: {
      'Hello World': {
        HelloWorldUseCase: {
          instances: [
            {
              instanceName: 'myUseCase',
              dependencies: ['todoRepo'],
            },
          ],
        },
      },
    },
  },
};
