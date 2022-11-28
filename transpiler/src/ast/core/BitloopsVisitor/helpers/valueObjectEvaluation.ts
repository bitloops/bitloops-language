import { NameNodeBuilder } from './../../../../refactoring-arch/intermediate-ast/builders/NameBuilder';
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

import { DomainEvaluationNodeBuilder } from './../../../../refactoring-arch/intermediate-ast/builders/expressions/evaluation/DomainEvaluation/DomainEvaluationNodeBuilder.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { ValueObjectEvaluationNodeBuilder } from '../../../../refactoring-arch/intermediate-ast/builders/expressions/evaluation/ValueObjectEvaluationBuilder.js';

export const valueObjectEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ValueObjectEvaluationContext,
) => {
  const identifier = ctx.valueObjectIdentifier().getText();
  const props = thisVisitor.visit(ctx.domainEvaluationInput());
  const nameNode = new NameNodeBuilder().withName(identifier).build();
  const domainEvaluation = new DomainEvaluationNodeBuilder()
    .withName(nameNode)
    .withProps(props)
    .build();
  const node = new ValueObjectEvaluationNodeBuilder()
    .withDomainEvaluation(domainEvaluation)
    .build();
  return node;
};
