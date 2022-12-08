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
import { produceMetadata } from '../metadata.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../intermediate-ast/nodes/statements/StatementList.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { PrivateMethodDeclarationNodeBuilder } from '../../intermediate-ast/builders/methods/PrivateMethodDeclarationNodeBuilder.js';
import { PrivateMethodDeclarationNode } from '../../intermediate-ast/nodes/methods/PrivateMethodDeclarationNode.js';

export const privateMethodDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PrivateMethodDeclarationContext,
): PrivateMethodDeclarationNode => {
  const methodNameNode = thisVisitor.visit(ctx.identifier());
  const parameterDependencies: ParameterListNode = thisVisitor.visit(ctx.parameterList());
  const returnType: BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode = thisVisitor.visit(
    ctx.returnPrivateMethodType(),
  );
  const statements: StatementListNode = thisVisitor.visit(ctx.functionBody());
  // const returnOkType = returnType as TOkErrorReturnTypeValues;

  // const statementsWithModifiedReturn = modifyReturnOkErrorStatements(statements, returnOkType);

  // addReturnOkVoidStatement(statementsWithModifiedReturn, returnOkType);

  const metadata = produceMetadata(ctx, thisVisitor);
  const methodNode = new PrivateMethodDeclarationNodeBuilder(metadata)
    .withIdentifier(methodNameNode)
    .withParameters(parameterDependencies)
    .withReturnType(returnType)
    .withStatements(statements)
    .build();
  return methodNode;
};
