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
// import { addReturnOkVoidStatement } from './addReturnOkVoidStatement.js';
// import { modifyReturnOkErrorStatements } from './modifyReturnOkErrorStatements.js';

// import { modifyReturnOkErrorStatements } from './modifyReturnOkErrorStatements.js';
import { UseCaseIdentifierNode } from '../../intermediate-ast/nodes/UseCase/UseCaseIdentifierNode.js';
import { UseCaseExecuteNode } from '../../intermediate-ast/nodes/UseCase/UseCaseExecuteNode.js';
import { produceMetadata } from '../metadata.js';
import { UseCaseNodeBuilder } from '../../intermediate-ast/builders/UseCase/UseCaseNodeBuilder.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { StatementListNode } from '../../intermediate-ast/nodes/statements/StatementList.js';
import { UseCaseExecuteNodeBuilder } from '../../intermediate-ast/builders/UseCase/UseCaseExecuteNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../../intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';

export const useCaseDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.UseCaseDeclarationContext,
): void => {
  const useCaseIdentifierNode: UseCaseIdentifierNode = thisVisitor.visit(ctx.useCaseIdentifier());

  const useCaseExecuteNode: UseCaseExecuteNode = thisVisitor.visit(ctx.useCaseExecuteDeclaration());

  const parameterListNode: ParameterListNode = thisVisitor.visit(ctx.parameterList());

  const metadata = produceMetadata(ctx, thisVisitor);
  new UseCaseNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withExecute(useCaseExecuteNode)
    .withIdentifier(useCaseIdentifierNode)
    .withParameterList(parameterListNode)
    .build();
};

export const useCaseExecuteDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.UseCaseExecuteDeclarationContext,
): UseCaseExecuteNode => {
  const returnTypeNode: ReturnOkErrorTypeNode = thisVisitor.visit(ctx.returnOkErrorType());
  const parameterListNode: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const statementListNode: StatementListNode = thisVisitor.visit(ctx.functionBody());

  //TODO add statementsWithModifiedReturn in model to model
  // const statementsWithModifiedReturn = modifyReturnOkErrorStatements(statements, returnTypes);
  const metadata = produceMetadata(ctx, thisVisitor);
  const executeNode = new UseCaseExecuteNodeBuilder(metadata)
    .withParameterList(parameterListNode)
    .withStatementList(statementListNode)
    .withReturnType(returnTypeNode)
    .build();

  return executeNode;
};
