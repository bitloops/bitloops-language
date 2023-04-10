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
import { produceMetadata } from '../metadata.js';
import { VariableDeclarationNode } from '../../intermediate-ast/nodes/variableDeclaration.js';
import { ForStatementNode } from '../../intermediate-ast/nodes/statements/iteration/forStatementNode.js';
import { ForStatementNodeBuilder } from '../../intermediate-ast/builders/statements/ForStatementNodeBuilder.js';

export const forStatetmentVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ForStatementContext,
): ForStatementNode => {
  const variableDeclaration: VariableDeclarationNode = thisVisitor.visit(ctx.variableDeclaration());
  const forCondition = thisVisitor.visit(ctx.expression(0));
  const forIncrement = thisVisitor.visit(ctx.expression(1));
  const forBody = thisVisitor.visit(ctx.statementList());

  const metadata = produceMetadata(ctx, thisVisitor);

  return new ForStatementNodeBuilder(metadata)
    .withVariableDeclaration(variableDeclaration)
    .withCondition(forCondition)
    .withIncrement(forIncrement)
    .withBody(forBody)
    .build();
};

// export const forOfStatetmentVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.IterationStatementContext,
// ): ForOfStatementNode => {
//   const variableDeclaration: VariableDeclarationNode = thisVisitor.visit(ctx.variableDeclaration());
//   const forCondition = thisVisitor.visit(ctx.expression(0));
//   const forIncrement = thisVisitor.visit(ctx.expression(1));
//   const forBody = thisVisitor.visit(ctx.statementList());

//   const metadata = produceMetadata(ctx, thisVisitor);

//   return new ForOfStatementNodeBuilder(metadata)
//     .withVariableDeclaration(variableDeclaration)
//     .withCondition(forCondition)
//     .withIncrement(forIncrement)
//     .withBody(forBody)
//     .build();
// };
