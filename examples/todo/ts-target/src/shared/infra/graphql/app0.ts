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
import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';
import { todoGetAllGQLController } from '../../../bounded-contexts/todo/todo/DI';

const typeDefs = GraphQL.gql`
  type TodoReadModel {
    id: String
    title: String
    completed: Boolean
  }  

  type TodoGetAllResponse {
    todos: [TodoReadModel]
  }

  type Query {
    todoGetAll: TodoGetAllResponse
  }
`;

const resolvers = {
  Query: {
    todoGetAll: async (_parent: any, args: any, context: any) => {
      const result = await todoGetAllGQLController.execute({ args: args.input, context });
      return result;
    },
  },
};

const server = new GraphQL.ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.APOLLO_SERVER || 5002 }, () =>
  console.log(
    `🚀 Apollo Server ready at http://localhost:${process.env.APOLLO_SERVER || 5002}${
      server.graphqlPath
    }`,
  ),
);
