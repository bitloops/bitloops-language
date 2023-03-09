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

import { RegexLiteralNodeBuilder } from '../../../../intermediate-ast/builders/expressions/literal/RegexLiteralNodeBuilder.js';
import { RegexLiteralNode } from '../../../../intermediate-ast/nodes/Expression/Literal/RegexLiteralNode.js';

export const regexLiteralEvaluation = (value: string): RegexLiteralNode => {
  // const value = value.substring(1, value.length - 1);
  const literalNode = new RegexLiteralNodeBuilder().withValue(value).build();
  return literalNode;
};
