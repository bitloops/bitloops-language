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
import { ReadModelEvaluationNode } from '../../intermediate-ast/nodes/Expression/Evaluation/ReadModelEvaluationNode.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { PackageEvaluationNodeBuilder } from '../../intermediate-ast/builders/expressions/evaluation/PackageEvaluationNodeBuilder.js';
import { PackageMethodNameBuilder } from '../../intermediate-ast/builders/expressions/evaluation/PackageMethodNameBuilder.js';

export const packageEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PackageEvaluationContext,
): ReadModelEvaluationNode => {
  const packageIdentifier: IdentifierNode = thisVisitor.visit(ctx.packageIdentifier());

  const methodName = ctx.regularIdentifier().getText();
  console.log({ methodName, rest: ctx.regularIdentifier() });
  // const identifier = thisVisitor.visit(ctx.regularIdentifier());

  // // this won't need to build a new IdentifierExpressionBuilder
  // const identifierExpr = new IdentifierExpressionBuilder().withValue(identifier.value).build();
  const argumentList = thisVisitor.visit(ctx.methodArguments());

  const metadata = produceMetadata(ctx, thisVisitor);

  const node = new PackageEvaluationNodeBuilder(metadata)
    .withPackageIdentifier(packageIdentifier)
    .withMethodName(
      new PackageMethodNameBuilder(produceMetadata(ctx.regularIdentifier(), thisVisitor))
        .withName(methodName)
        .build(),
    )
    .withArgumentsList(argumentList)
    .build();
  return node;
};
