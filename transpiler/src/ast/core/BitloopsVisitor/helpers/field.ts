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
// import { TVariable } from '../../../../types.js';
import { FieldNode } from '../../../../refactoring-arch/intermediate-ast/nodes/FieldNode.js';

export const fieldVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.FieldContext,
): FieldNode => {
  const fieldNode = new FieldNode();
  const identifier = ctx.identifier().getText();

  const type = _thisVisitor.visit(ctx.bitloopsPrimaryType());
  if (ctx.Optional()) {
    fieldNode.buildOptionalVariable(type, identifier);
  } else {
    fieldNode.buildVariable(type, identifier);
  }

  // return fieldNode
  return fieldNode;
};
