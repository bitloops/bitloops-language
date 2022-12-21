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
import { ExpressionNode } from '../../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { VariableDeclarationNode } from '../../intermediate-ast/nodes/variableDeclaration.js';
import { produceMetadata } from '../metadata.js';
import { VariableDeclarationNodeBuilder } from '../../intermediate-ast/builders/statements/variableDeclaration.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export const variableDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.VariableDeclarationContext,
): VariableDeclarationNode => {
  const identifierNode: IdentifierNode = thisVisitor.visit(ctx.identifier());

  const expressionNode: ExpressionNode = thisVisitor.visit(ctx.expression());

  let variableDeclarationNode: VariableDeclarationNode;
  const metadata = produceMetadata(ctx, thisVisitor);
  if (ctx.typeAnnotation()) {
    const typeAnnotationNode: BitloopsPrimaryTypeNode = thisVisitor.visit(ctx.typeAnnotation());
    variableDeclarationNode = new VariableDeclarationNodeBuilder(metadata)
      .withIdentifier(identifierNode)
      .withExpression(expressionNode)
      .withTypeAnnotation(typeAnnotationNode)
      .build();
  } else {
    variableDeclarationNode = new VariableDeclarationNodeBuilder(metadata)
      .withIdentifier(identifierNode)
      .withExpression(expressionNode)
      .build();
  }

  return variableDeclarationNode;
};
