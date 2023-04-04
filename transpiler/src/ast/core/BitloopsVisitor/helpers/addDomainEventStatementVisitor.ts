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
import { BuiltInFunctionNodeBuilder } from '../../intermediate-ast/builders/statements/builtInFunction/BuiltInFunction.js';
import { BuiltInFunctionNode } from '../../intermediate-ast/nodes/statements/builtinFunction/BuiltinFunctionNode.js';
import { AddDomainEventNode } from '../../intermediate-ast/nodes/statements/builtinFunction/AddDomainEventNode.js';
import { AddDomainEventNodeBuilder } from '../../intermediate-ast/builders/statements/builtInFunction/AddDomainEventNodeBuilder.js';
import { ExpressionNode } from '../../intermediate-ast/nodes/Expression/ExpressionNode.js';

export const addDomainEventStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.AddDomainEventStatementContext,
): BuiltInFunctionNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const expression: ExpressionNode = thisVisitor.visit(ctx.expression());
  const addDomainEventNodeBuilder = new AddDomainEventNodeBuilder(metadata).withExpression(
    expression,
  );

  ctx.identifier()
    ? addDomainEventNodeBuilder.withIdentifier(thisVisitor.visit(ctx.identifier()))
    : addDomainEventNodeBuilder.withThisIdentifier(thisVisitor.visit(ctx.thisIdentifier()));

  const addDomainEventNode: AddDomainEventNode = addDomainEventNodeBuilder.build();
  return new BuiltInFunctionNodeBuilder(metadata).withBuiltInFunction(addDomainEventNode).build();
};
