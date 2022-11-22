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
import { ExpressionNode } from '../../../../refactoring-arch/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ArrayLiteralExpressionNodeBuilder } from './../../../../refactoring-arch/intermediate-ast/builders/expressions/arrayLiteralExpressionBuilder.js';
import { ArrayLiteralExpressionNode } from '../../../../refactoring-arch/intermediate-ast/nodes/Expression/ArrayLiteralExpression.js';

// export const arrayLiteralVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.ArrayLiteralContext,
// ): TArrayLiteralExpression => {
//   // index 0 is the '[', 1 the elementList
//   const children = thisVisitor.visitChildren(ctx)?.[1];
//   if (!children) {
//     return {
//       arrayLiteral: [],
//     };
//   }
//   const expressions = children.filter((child) => child !== undefined);
//   return {
//     arrayLiteral: expressions,
//   };
// };
export const arrayLiteralVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ArrayLiteralContext,
): ArrayLiteralExpressionNode => {
  // index 0 is the '[', 1 the elementList
  const children = thisVisitor.visitChildren(ctx)?.[1];
  if (!children) {
    return new ArrayLiteralExpressionNodeBuilder().withArrayElements([]).build();
  }

  const expressionNodes: ExpressionNode[] = children.filter((child) => child !== undefined);
  const arrayLiteralExpressionNode = new ArrayLiteralExpressionNodeBuilder()
    .withArrayElements(expressionNodes)
    .build();
  return arrayLiteralExpressionNode;
};

// export const dtoDeclarationVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.DtoDeclarationContext,
// ): { DTOs: DTONode } => {
//   const dtoIdentifierNode: DTOIdentifierNode = thisVisitor.visit(ctx.dtoIdentifier());

//   const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

//   const dtoNode = new DTONodeBuilder(thisVisitor.intermediateASTTree)
//     .withIdentifier(dtoIdentifierNode)
//     .withVariables(fieldListNode)
//     .build();

//   return {
//     DTOs: dtoNode,
//   };
// };
