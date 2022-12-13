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
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { ExpressionNode } from '../../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { TypeAnnotationNode } from '../../intermediate-ast/nodes/TypeAnnotationNode.js';
import { ConstDeclarationNodeBuilder } from '../../intermediate-ast/builders/statements/constDeclaration.js';
import { produceMetadata } from '../metadata.js';

export const constDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ConstDeclarationContext,
): ConstDeclarationNode => {
  const identifierNode: IdentifierNode = thisVisitor.visit(ctx.identifier());

  const expressionNode: ExpressionNode = thisVisitor.visit(ctx.expression());

  let constDeclarationNode: ConstDeclarationNode;
  const metadata = produceMetadata(ctx, thisVisitor);
  if (ctx.typeAnnotation()) {
    const typeAnnotationNode: TypeAnnotationNode = thisVisitor.visit(ctx.typeAnnotation());
    constDeclarationNode = new ConstDeclarationNodeBuilder(metadata)
      .withIdentifier(identifierNode)
      .withExpression(expressionNode)
      .withTypeAnnotation(typeAnnotationNode)
      .build();
  } else {
    constDeclarationNode = new ConstDeclarationNodeBuilder(metadata)
      .withIdentifier(identifierNode)
      .withExpression(expressionNode)
      .build();
  }

  return constDeclarationNode;
};
