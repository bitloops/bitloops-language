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
import { TDTO } from '../../../../types.js';
import { DTONode } from '../../../../refactoring-arch/intermediate-ast/nodes/DTONode.js';
import { IdentifierNode } from '../../../../refactoring-arch/intermediate-ast/nodes/IdentifierNode.js';

export const dtoDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DtoDeclarationContext,
): { DTOs: TDTO } => {
  const identifier = ctx.DTOIdentifier().getText();
  const dtoNode = new DTONode();
  const identifierNode = new IdentifierNode();
  thisVisitor.intermediateASTTree.insertChild(dtoNode);
  thisVisitor.intermediateASTTree.insertChild(identifierNode);

  const fields = thisVisitor.visit(ctx.fieldList());

  dtoNode.buildDTO(identifier, fields);

  thisVisitor.intermediateASTTree.setCurrentNodeToRoot();
  return {
    DTOs: dtoNode.value,
  };
};
