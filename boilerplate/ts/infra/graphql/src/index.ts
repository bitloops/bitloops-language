import { ApolloServer as ApolloServerImport, gql as gqlImport } from 'apollo-server';
import { BaseGraphQLController } from './models/BaseGraphQLController';

namespace GraphQL {
  export class ApolloServer extends ApolloServerImport {}
  export const gql = gqlImport;

  export const BaseController = BaseGraphQLController;
}

export { GraphQL };
