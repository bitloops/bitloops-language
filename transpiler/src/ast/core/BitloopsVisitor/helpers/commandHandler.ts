import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { CommandHandlerNodeBuilder } from '../../intermediate-ast/builders/command/CommandHandlerNodeBuilder.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ExecuteNode } from '../../intermediate-ast/nodes/UseCase/UseCaseExecuteNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

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
export const commandHandlerVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CommandHandlerContext,
): void => {
  const identifierNode: IdentifierNode = thisVisitor.visit(ctx.commandHandlerIdentifier());

  const executeNode: ExecuteNode = thisVisitor.visit(ctx.executeDeclaration());

  const parameterListNode: ParameterListNode = thisVisitor.visit(ctx.parameterList());

  const metadata = produceMetadata(ctx, thisVisitor);
  new CommandHandlerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(identifierNode)
    .withParameterList(parameterListNode)
    .withExecute(executeNode)
    .build();
};
