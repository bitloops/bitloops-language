import { TBoundedContexts } from '../../../../ast/core/types.js';
import { TGraphQLOperation } from '../../../../types.js';

/**
 *  Bitloops Language CLI
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
export type AllResolvers = Record<string, ResolverValues>;

export type ResolverValues = {
  typeDefs: SchemaBuilder;
  handlers: ResolversBuilder;
};

export type SchemaBuilder = {
  types: Record<TypeName, GeneratedGraphQLType>;
  inputs: Record<InputName, GeneratedGraphQLInput>;
  queries: Record<string, string>;
  mutations: Record<string, string>;
};

export type InstantiatedController = string;
export type ResolversBuilder = {
  queries: Record<string, InstantiatedController>;
  mutations: Record<string, InstantiatedController>;
};

type InputName = string;
type TypeName = string;

type GeneratedGraphQLInput = string;
type GeneratedGraphQLType = string;

export interface IAddResolversToServer {
  serverName: string;
  resolver: {
    name: string; // Should match the Operation name
    boundedContext: string;
    module: string;
  };
}

export type TResolvers = TResolver[];

export type TResolver = {
  boundedContext: string;
  module: string;
  operationType: TGraphQLOperation;
  operationName: string;
  input: string | null; // a DTO or nothing for no input
  output: string; // a DTO
  controller: string;
};

export interface IServer {
  type: string;
  name: string;
  port: string;
}

/**
 * GraphQL Setup
 */
export type TGraphQLSetupData = {
  servers: IServer[];
  resolvers: TResolvers;
  addResolversToServer: IAddResolversToServer[];
  bitloopsModel: TBoundedContexts;
};
