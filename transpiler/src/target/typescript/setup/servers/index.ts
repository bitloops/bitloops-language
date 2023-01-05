import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TGraphQLServerInstance, TRESTServerInstance, TServerType } from '../../../../types.js';

export type TServerInstance = TRESTServerInstance | TGraphQLServerInstance;
// export type TRestAndGraphQLServers = TServer[];

export type TRestAndGraphQLServers = Partial<{
  [key in TServerType]: {
    serverInstances: (TRESTServerInstance | TGraphQLServerInstance)[];
  };
}>;

export const groupServers = (setupTree: IntermediateASTTree): TRestAndGraphQLServers => {
  const result: TRestAndGraphQLServers = {
    'REST.Fastify': {
      serverInstances: [],
    },
    'REST.Express': {
      serverInstances: [],
    },
    GraphQL: {
      serverInstances: [],
    },
  };
  const restServers = setupTree.getRootChildrenNodesValueByType<TRESTServerInstance>(
    BitloopsTypesMapping.TServers,
  );
  for (const server of restServers) {
    const { serverType } = server.restServer.serverOptions;
    result[serverType].serverInstances.push(server);
  }
  // TODO - GraphQL servers
  return result;
  // const graphQLServers
};

export const isRestServer = (server: TServer): server is TRESTServerInstance => {
  if ('restServer' in server) {
    return true;
  }
  return false;
};
