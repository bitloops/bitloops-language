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

import { StringLiteralBuilder } from '../../../../intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { StringLiteralNode } from '../../../../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';

export const stringEvaluation = (value: string): StringLiteralNode => {
  // return { type: 'string', value: value.substring(1, value.length - 1) };

  const trimmedValue = value.substring(1, value.length - 1);
  const literalNode = new StringLiteralBuilder().withValue(trimmedValue).build();
  return literalNode;
};
