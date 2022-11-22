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

import { LiteralTypeBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralTypeBuilder.js';
import { LiteralValueBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/components/LiteralValueBuilder.js';
import { DecimalLiteralBuilder } from '../../../../../../refactoring-arch/intermediate-ast/builders/expressions/literal/NumericLiteral/DecimalLiteralBuilder.js';
import { DecimalLiteralNode } from '../../../../../../refactoring-arch/intermediate-ast/nodes/Expression/Literal/NumericLiteral/DecimalLiteralNode.js';

// export const decimalEvaluation = (value: any): any => {
//   const decimalPart = value.split('.')[1].length;
//   // const decimalValue = Number(value);
//   if (decimalPart <= 7) {
//     return {
//       type: 'float',
//       value: value,
//     };
//   } else {
//     return {
//       type: 'double',
//       value: value,
//     };
//   }
// };
export const decimalEvaluation = (value: string): DecimalLiteralNode => {
  const decimalPart = value.split('.')[1].length;

  const valueNode = new LiteralValueBuilder().withValue(value).build();
  if (decimalPart <= 7) {
    const typeNode = new LiteralTypeBuilder().withType('float').build();
    const literalNode = new DecimalLiteralBuilder().withValue(valueNode).withType(typeNode).build();
    return literalNode;
  }
  const typeNode = new LiteralTypeBuilder().withType('double').build();
  const literalNode = new DecimalLiteralBuilder().withValue(valueNode).withType(typeNode).build();
  return literalNode;
};
