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

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { ExecuteNode } from '../../intermediate-ast/nodes/ExecuteNode.js';
import { produceMetadata } from '../metadata.js';
import { StatementListNode } from '../../intermediate-ast/nodes/statements/StatementList.js';
import { ExecuteNodeBuilder } from '../../intermediate-ast/builders/ExecuteNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../../intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ParameterNode } from '../../intermediate-ast/nodes/ParameterList/ParameterNode.js';

export const executeDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ExecuteDeclarationContext,
): ExecuteNode => {
  const returnTypeNode: ReturnOkErrorTypeNode = thisVisitor.visit(ctx.returnOkErrorType());
  const parameterNode: ParameterNode = ctx.parameter() ? thisVisitor.visit(ctx.parameter()) : null;
  const statementListNode: StatementListNode = thisVisitor.visit(ctx.functionBody());

  const metadata = produceMetadata(ctx, thisVisitor);
  const executeNodeBuilder = new ExecuteNodeBuilder(metadata)
    .withStatementList(statementListNode)
    .withReturnType(returnTypeNode);
  if (parameterNode) executeNodeBuilder.withParameter(parameterNode);

  return executeNodeBuilder.build();
};
