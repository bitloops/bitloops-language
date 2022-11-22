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
// export const integerEvaluation = (value: any): any => {
//   const numericValue = Number(value);
//   if (numericValue >= -2147483648 && numericValue <= 2147483647) {
//     return { type: 'int32', value: value };
//   } else if (numericValue >= -9223372036854775808 && numericValue <= 9223372036854775807n) {
//     return { type: 'int64', value: value };
//   } else {
//     throw new Error(`Integer out of range: ${value}`);
//   }
// };

import { LiteralTypeBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralValueBuilder.js';
import { IntegerLiteralBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/NumericLiteral/IntegerLiteralBuilder.js';
import { IntegerLiteralNode } from '../../../../../../refactoring-arch/intermediate-ast/nodes/Expression/Literal/NumericLiteral/IntegerLiteralNode.js';

export const integerEvaluation = (value: string): IntegerLiteralNode => {
  const numericValue = Number(value);

  const valueNode = new LiteralValueBuilder().withValue(value).build();
  if (numericValue >= -2147483648 && numericValue <= 2147483647) {
    const typeNode = new LiteralTypeBuilder().withType('int32').build();
    const literalNode = new IntegerLiteralBuilder().withValue(valueNode).withType(typeNode).build();
    return literalNode;
  }
  if (numericValue >= -9223372036854775808 && numericValue <= 9223372036854775807n) {
    const typeNode = new LiteralTypeBuilder().withType('int64').build();
    const literalNode = new IntegerLiteralBuilder().withValue(valueNode).withType(typeNode).build();
    return literalNode;
  }
  throw new Error(`Integer out of range: ${value}`);
};

// export const fieldVisitor = (
//   _thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.FieldContext,
// ): FieldNode => {
//   const identifierNode = _thisVisitor.visit(ctx.identifier());

//   const typeNode = _thisVisitor.visit(ctx.bitloopsPrimaryType());

//   const optionalNode = _thisVisitor.visit(ctx.optional());

//   const fieldNode = new FieldNodeBuilder()
//     .withType(typeNode)
//     .withName(identifierNode)
//     .withOptional(optionalNode)
//     .build();

//   return fieldNode;
// };
