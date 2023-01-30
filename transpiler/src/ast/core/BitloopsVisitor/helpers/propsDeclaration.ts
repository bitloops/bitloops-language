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
import { PropsIdentifierNode } from '../../intermediate-ast/nodes/Props/PropsIdentifierNode.js';
import { FieldListNode } from '../../intermediate-ast/nodes/FieldList/FieldListNode.js';
import { produceMetadata } from '../metadata.js';
import { PropsNodeBuilder } from '../../intermediate-ast/builders/Props/PropsNodeBuilder.js';
import { PropsNode } from '../../intermediate-ast/nodes/Props/PropsNode.js';

export const propsDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PropsDeclarationContext,
): { Props: PropsNode } => {
  const propsIdentifierNode: PropsIdentifierNode = thisVisitor.visit(ctx.propsIdentifier());

  const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

  const metadata = produceMetadata(ctx, thisVisitor);

  const propsNode = new PropsNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(propsIdentifierNode)
    .withVariables(fieldListNode)
    .build();

  return {
    Props: propsNode,
  };
};
