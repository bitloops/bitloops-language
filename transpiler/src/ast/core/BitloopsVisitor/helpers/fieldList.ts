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
import { TVariables } from '../../../../types.js';
import { FieldListNode } from '../../../../refactoring-arch/intermediate-ast/nodes/FieldListNode.js';

export const fieldListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.FieldListContext,
): FieldListNode => {
  const classType = thisVisitor.intermediateASTTree.getCurrentNodeClassType();
  const fieldListNode = new FieldListNode();
  fieldListNode.setClassType(classType);

  const fieldsAndSemicolons = thisVisitor.visitChildren(ctx);

  const variables: TVariables = [];
  fieldsAndSemicolons.forEach((fieldNode) => {
    if (fieldNode !== undefined) {
      fieldListNode.addChild(fieldNode);
      variables.push(fieldNode.value);
    }
  });
  fieldListNode.buildVariables(variables);
  // return fieldListNode
  return fieldListNode;
};
