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
import { EntityConstructorEvaluationNode } from '../../../../intermediate-ast/nodes/Expression/Evaluation/EntityConstructorEvaluationNode.js';
import { produceMetadata } from '../../../metadata.js';
import { DomainEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import { EntityConstructorEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/EntityConstructorEvaluationNodeBuilder.js';

export const entityConstructorEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EntityConstructorEvaluationContext,
): EntityConstructorEvaluationNode => {
  const props = thisVisitor.visit(ctx.domainEvaluationInput());
  const entityIdentifier = thisVisitor.visit(ctx.entityIdentifier());

  const metadata = produceMetadata(ctx, thisVisitor);
  const domainEvaluation = new DomainEvaluationNodeBuilder(metadata)
    .withIdentifier(entityIdentifier)
    .withProps(props)
    .build();

  const node = new EntityConstructorEvaluationNodeBuilder(metadata)
    .withDomainEvaluation(domainEvaluation)
    .build();
  return node;
};
