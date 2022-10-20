import { ApolloServer as ApolloServerImport, gql as gqlImport } from 'apollo-server';
import { BaseGraphQLController } from './models/BaseGraphQLController';
import { TGraphQLRequest } from './models/types';

namespace GraphQL {
  export class ApolloServer extends ApolloServerImport {}
  export const gql = gqlImport;

  export const BaseController = BaseGraphQLController;
  export type TRequest<ArgsType> = TGraphQLRequest<ArgsType>;
}

export { GraphQL };
