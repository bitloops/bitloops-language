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

import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { AssignmentExpressionNode } from '../../../intermediate-ast/nodes/Expression/AssignmentExpression.js';
import { AssignmentExpressionNodeBuilder } from '../../../intermediate-ast/builders/expressions/assignmentExprBuilder.js';
import { ExpressionBuilder } from '../../../intermediate-ast/builders/expressions/ExpressionBuilder.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';

export const assignmentExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.AssignmentExpressionContext,
): AssignmentExpressionNode => {
  const leftExpression = thisVisitor.visit(ctx.expression(0));
  const rightExpression = thisVisitor.visit(ctx.expression(1));
  const assignmentNode = new AssignmentExpressionNodeBuilder()
    .withLeftExpression(leftExpression)
    .withRightExpression(rightExpression)
    .build();
  return new ExpressionBuilder().withExpression(assignmentNode).build();

  // TODO Remove thisDeclaration completely
  // const leftExpression = thisVisitor.visit(ctx.expression(0));
  // const leftExpressionValue = leftExpression.expression.evaluation.regularEvaluation.value;
  // const rightExpression = thisVisitor.visit(ctx.expression(1));
  // // TODO Fix model so that thisDeclaration is not a statement, but an expression
  // if (leftExpressionValue.startsWith('this.')) {
  //   return {
  //     thisDeclaration: {
  //       name: leftExpressionValue,
  //       expression: rightExpression.expression,
  //     },
  //   };
  // }

  throw new Error('Not implemented');
};
