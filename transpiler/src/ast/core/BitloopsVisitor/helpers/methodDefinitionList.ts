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
import { MethodDefinitionListNode } from '../../intermediate-ast/nodes/method-definitions/MethodDefinitionListNode.js';
import { MethodDefinitionNode } from '../../intermediate-ast/nodes/method-definitions/MethodDefinitionNode.js';
import { MethodDefinitionListNodeBuilder } from '../../intermediate-ast/builders/methodDefinition/methodDefinitionListNodeBuilder.js';

export const methodDefinitionListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.MethodDefinitionListContext,
): MethodDefinitionListNode => {
  const methodDefinitions: MethodDefinitionNode[] = thisVisitor.visitChildren(ctx);

  if (methodDefinitions.length > 0) {
    // for (const methodDefinition of methodDefinitions) {
    //   methodDefinitions[child.methodName] = child.methodInfo;
    // }
  }

  return new MethodDefinitionListNodeBuilder().withMethodDefinitions(methodDefinitions).build();
};
