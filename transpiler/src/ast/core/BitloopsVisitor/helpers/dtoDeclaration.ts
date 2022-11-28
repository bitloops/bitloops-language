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
import { DTONodeBuilder } from '../../../../refactoring-arch/intermediate-ast/builders/DTO/DTONodeBuilder.js';
import { DTOIdentifierNode } from '../../../../refactoring-arch/intermediate-ast/nodes/DTO/DTOIdentifierNode.js';
import { DTONode } from '../../../../refactoring-arch/intermediate-ast/nodes/DTO/DTONode.js';
import { FieldListNode } from '../../../../refactoring-arch/intermediate-ast/nodes/FieldList/FieldListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const dtoDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DtoDeclarationContext,
): { DTOs: DTONode } => {
  const dtoIdentifierNode: DTOIdentifierNode = thisVisitor.visit(ctx.dtoIdentifier());

  const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

  const ctxToParse = ctx as any;
  const metadata = {
    start: {
      line: ctxToParse.start.line,
      column: ctxToParse.start.column,
    },
    end: {
      line: ctxToParse.stop.line,
      column: ctxToParse.stop.column,
    },
    file: thisVisitor.currentFile,
  };

  const dtoNode = new DTONodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(dtoIdentifierNode)
    .withVariables(fieldListNode)
    .build();

  return {
    DTOs: dtoNode,
  };
};
