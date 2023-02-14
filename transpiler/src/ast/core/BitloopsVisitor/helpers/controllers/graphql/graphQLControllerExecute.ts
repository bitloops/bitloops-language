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
import { GraphQLControllerExecuteNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLControllerExecuteNodeBuilder.js';
import { GraphQLExecuteDependenciesNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLExecuteDependenciesNodeBuilder.js';
import { produceMetadata } from '../../../metadata.js';
import { GraphQLControllerExecuteDependenciesNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteDependenciesNode.js';
import { GraphQLControllerExecuteNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteNode.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../../../../intermediate-ast/nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { GraphQLControllerExecuteReturnTypeNodeBuilder } from '../../../../intermediate-ast/builders/controllers/graphQL/GraphQLControllerExecuteReturnTypeNodeBuilder.js';

export const graphQLControllerExecuteVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerExecuteDeclarationContext,
): GraphQLControllerExecuteNode => {
  const executeParams = thisVisitor.visit(ctx.graphQLControllerParameters());

  const returnType = thisVisitor.visit(ctx.graphQLControllerReturnType());
  const statementListNode = thisVisitor.visit(ctx.functionBody());
  const executeNode = new GraphQLControllerExecuteNodeBuilder()
    .withDependencies(executeParams)
    .withReturnType(returnType)
    .withStatementList(statementListNode)
    .build();
  return executeNode;
};

export const graphQLExecuteDependenciesVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerParametersContext,
): GraphQLControllerExecuteDependenciesNode => {
  const requestIdentifier = ctx.Identifier().getText();
  return new GraphQLExecuteDependenciesNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withDependency(requestIdentifier)
    .build();
};

export const graphQLControllerReturnTypeVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerReturnTypeContext,
): GraphQLControllerExecuteReturnTypeNode => {
  const returnType = ctx.DTOIdentifier().getText();
  return new GraphQLControllerExecuteReturnTypeNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withType(returnType)
    .build();
};
