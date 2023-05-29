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

import BitloopsVisitor from '../../../BitloopsVisitor.js';
import BitloopsParser from '../../../../../../parser/core/grammar/BitloopsParser.js';
import { produceMetadata } from '../../../metadata.js';
import { DomainEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { ValueObjectConstructorEvaluationNode } from '../../../../intermediate-ast/nodes/Expression/Evaluation/ValueObjectConstructorEvaluationNode.js';
import { ValueObjectConstructorEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/ValueObjectConstructorEvaluationNodeBuilder.js';

export const valueObjectConstructorEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ValueObjectConstructorEvaluationContext,
): ValueObjectConstructorEvaluationNode => {
  const props = thisVisitor.visit(ctx.domainEvaluationInput());
  const valueObjectIdentifier = thisVisitor.visit(ctx.valueObjectIdentifier());

  const metadata = produceMetadata(ctx, thisVisitor);
  const domainEvaluation = new DomainEvaluationNodeBuilder(metadata)
    .withIdentifier(valueObjectIdentifier)
    .withProps(props)
    .build();

  const node = new ValueObjectConstructorEvaluationNodeBuilder(metadata)
    .withEvaluation(domainEvaluation)
    .build();
  return node;
};
