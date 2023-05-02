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

import { LiteralTypeBuilder } from '../../../../intermediate-ast/builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../../../../intermediate-ast/builders/expressions/literal/components/LiteralValueBuilder.js';
import { IntegerLiteralBuilder } from '../../../../intermediate-ast/builders/expressions/literal/NumericLiteral/IntegerLiteralBuilder.js';
import { IntegerLiteralNode } from '../../../../intermediate-ast/nodes/Expression/Literal/NumericLiteral/IntegerLiteralNode.js';

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
