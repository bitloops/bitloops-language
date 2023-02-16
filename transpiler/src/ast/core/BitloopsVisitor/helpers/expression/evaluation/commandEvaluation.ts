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
import { CommandEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/CommandEvaluationNodeBuilder.js';
import { CommandEvaluationNode } from '../../../../intermediate-ast/nodes/Expression/Evaluation/CommandEvaluationNode.js';

export const commandEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CommandEvaluationContext,
): CommandEvaluationNode => {
  const identifier = thisVisitor.visit(ctx.commandIdentifier());
  const metadata = produceMetadata(ctx, thisVisitor);

  const node = new CommandEvaluationNodeBuilder(metadata).withIdentifier(identifier);
  if (ctx.evaluationFieldList()) {
    const fieldList = thisVisitor.visit(ctx.evaluationFieldList());
    node.withEvaluationFieldList(fieldList);
  }

  return node.build();
};
