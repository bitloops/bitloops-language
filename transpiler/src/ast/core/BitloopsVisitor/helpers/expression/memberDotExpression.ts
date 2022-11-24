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
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { MemberDotExpressionNodeBuilder } from '../../../../../refactoring-arch/intermediate-ast/builders/expressions/MemberDot/memberDotBuilder.js';
import { MemberDotExpressionNode } from './../../../../../refactoring-arch/intermediate-ast/nodes/Expression/MemberDot/MemberDotExpression.js';
import { IdentifierExpressionBuilder } from './../../../../../refactoring-arch/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';

export const memberDotExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.MemberDotExpressionContext,
): MemberDotExpressionNode => {
  const leftExpression = thisVisitor.visit(ctx.expression());

  // When regularIdentifier is updated to use the new IdentifierExpressionBuilder,
  const identifier = thisVisitor.visit(ctx.regularIdentifier());

  // this won't need to build a new IdentifierExpressionBuilder
  const identifierExpr = new IdentifierExpressionBuilder().withValue(identifier.value).build();
  return new MemberDotExpressionNodeBuilder()
    .withExpression(leftExpression)
    .withIdentifier(identifierExpr)
    .build();
  // const leftExpression = thisVisitor.visit(ctx.expression());
  // const leftExpressionValue = leftExpression.expression.evaluation.regularEvaluation.value;
  // const identifier = thisVisitor.visit(ctx.regularIdentifier());
  // const identifierValue = identifier.value;
  // const stringResult = `${leftExpressionValue}.${identifierValue}`;
  // return {
  //   expression: {
  //     evaluation: {
  //       regularEvaluation: {
  //         type: 'variable',
  //         value: stringResult,
  //       },
  //     },
  //   },
  // };
};
