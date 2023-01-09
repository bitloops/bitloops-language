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
import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import {
  RestServerOptions,
  TGraphQLServerInstance,
  TRESTServerInstance,
  TServerType,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { NodeValueHelpers } from '../helpers.js';

export type TServerInstance = TRESTServerInstance | TGraphQLServerInstance;

export type TRestAndGraphQLServers = Partial<{
  [key in TServerType]: {
    serverInstances: TServerInstance[];
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
    const { serverOptions } = server.restServer;
    const serverTypeExpr = NodeValueHelpers.findKeyOfEvaluationFieldList(
      serverOptions,
      RestServerOptions.server,
    );
    const serverType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TExpression,
      value: serverTypeExpr,
    });
    const serverTypeOutput = serverType.output as TServerType;
    result[serverTypeOutput].serverInstances.push(server);
  }
  // TODO - GraphQL servers
  return result;
  // const graphQLServers
};

export const isRestServer = (server: TServerInstance): server is TRESTServerInstance => {
  if ('restServer' in server) {
    return true;
  }
  return false;
};

// TODO fix
export const isGraphQLServerInstance = (
  serverInstance: TRESTServerInstance | TGraphQLServerInstance,
): serverInstance is TGraphQLServerInstance => {
  if ('resolvers' in serverInstance) return true;
  else return false;
};
