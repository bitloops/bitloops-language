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
import { TGraphQLSetupData, TTargetDependenciesTypeScript } from '../../../../types.js';
import { AllResolvers } from './types.js';
import { GraphQLSchemaGenerator } from './graphQLSchemaGenerator.js';
import { GraphQLServerGenerator } from './graphQLServerGenerator.js';

/**
 *  Gather for each resolver, the typeDefs and Query&Mutations associated with it
 * For each server find its corresponding resolvers
 * For all these resolvers, merge the typeDefs and resolverMap each into one object
 * (Remove duplicate inputs and types)
 */
const graphQLSetupDataToTargetLanguage = (
  setupData: TGraphQLSetupData,
): TTargetDependenciesTypeScript => {
  const { servers, resolvers, addResolversToServer, bitloopsModel } = setupData;

  const graphQLGenerator = new GraphQLSchemaGenerator();
  const resolversSchemasAndHandlers: AllResolvers =
    graphQLGenerator.generateResolversSchemasAndHandlers(resolvers, bitloopsModel);

  const graphQLServerGenerator = new GraphQLServerGenerator();
  return servers.reduce(
    (acc, server) => {
      const { output, dependencies } = graphQLServerGenerator.generateServerCode(
        server,
        addResolversToServer,
        resolversSchemasAndHandlers,
      );

      acc.output += output;
      acc.dependencies = [...acc.dependencies, ...dependencies];
      return acc;
    },
    { output: '', dependencies: [] },
  );
};

export { graphQLSetupDataToTargetLanguage };
