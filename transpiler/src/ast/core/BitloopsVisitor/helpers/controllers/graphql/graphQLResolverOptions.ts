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

import BitloopsParser from '../../../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../../../BitloopsVisitor.js';
import { TGraphQLOperation } from '../../../../../../types.js';
import { GraphQLOperationTypeNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLOperationTypeNodeBuilder.js';
import { produceMetadata } from '../../../metadata.js';
import { GraphQLInputTypeNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLInputTypeNodeBuilder.js';
import { GraphQLOperationTypeNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLOperationTypeNode.js';
import { GraphQLInputTypeNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLInputTypeNode.js';

export type TGraphQLResolverOptions = {
  graphQLOperationTypeNode: GraphQLOperationTypeNode;
  graphQLInputTypeNode: GraphQLInputTypeNode;
};

export const graphQLResolverOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLResolverOptionsContext,
): TGraphQLResolverOptions => {
  const graphQLOperationTypeNode: GraphQLOperationTypeNode = thisVisitor.visit(
    ctx.graphQLOperationTypeAssignment(),
  );
  let graphQLInputTypeNode: GraphQLInputTypeNode;
  if (ctx.graphQLOperationInputTypeAssignment()) {
    graphQLInputTypeNode = thisVisitor.visit(ctx.graphQLOperationInputTypeAssignment());
  } else {
    graphQLInputTypeNode = new GraphQLInputTypeNodeBuilder().withInputType(null).build();
  }
  return {
    graphQLOperationTypeNode,
    graphQLInputTypeNode,
  };
};

const graphQLOperationsMapping = {
  'GraphQL.Operations.Query': 'query',
  'GraphQL.Operations.Mutation': 'mutation',
  'GraphQL.Operations.Subscription': 'subscription',
};

export const graphQLOperationTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLOperationTypeAssignmentContext,
): GraphQLOperationTypeNode => {
  const operationTypeValue: TGraphQLOperation = ctx.graphQLOperation().getText();
  return new GraphQLOperationTypeNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withOperationType(graphQLOperationsMapping[operationTypeValue])
    .build();
};

export const graphQLOperationInputTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLOperationInputTypeAssignmentContext,
): GraphQLInputTypeNode => {
  const operationInputValue = ctx.graphQLResolverInputType().getText();
  return new GraphQLInputTypeNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withInputType(operationInputValue)
    .build();
};
