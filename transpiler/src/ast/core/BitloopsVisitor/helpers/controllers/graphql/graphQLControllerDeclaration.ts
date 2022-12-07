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
import { GraphQLControllerIdentifierNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { TGraphQLResolverOptions } from './graphQLResolverOptions.js';
import { GraphQLControllerNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLControllerNodeBuilder.js';
import { produceMetadata } from '../../../metadata.js';
import { GraphQLControllerExecuteNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteNode.js';

export const graphQLControllerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerDeclarationContext,
): void => {
  const identifierNode: GraphQLControllerIdentifierNode = thisVisitor.visit(
    ctx.graphQLControllerIdentifier(),
  );
  const dependencies = thisVisitor.visit(ctx.parameterList());
  const { graphQLInputTypeNode, graphQLOperationTypeNode }: TGraphQLResolverOptions =
    thisVisitor.visit(ctx.graphQLResolverOptions());
  const executeNode: GraphQLControllerExecuteNode = thisVisitor.visit(
    ctx.graphQLControllerExecuteDeclaration(),
  );

  new GraphQLControllerNodeBuilder(
    thisVisitor.intermediateASTTree,
    produceMetadata(ctx, thisVisitor),
  )
    .withIdentifier(identifierNode)
    .withInputType(graphQLInputTypeNode)
    .withOperationType(graphQLOperationTypeNode)
    .withDependencies(dependencies)
    .withExecuteNode(executeNode)
    .build();
};
