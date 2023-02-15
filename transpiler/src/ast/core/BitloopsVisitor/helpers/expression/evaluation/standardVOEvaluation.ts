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
import { DTOEvaluationNode } from '../../../../intermediate-ast/nodes/Expression/Evaluation/DTOEvaluation.js';
import { StandardVOEvaluationNodeBuilder } from '../../../../intermediate-ast/builders/expressions/evaluation/StandardVOEvaluationNodeBuilder.js';
import { IdentifierNode } from '../../../../intermediate-ast/nodes/identifier/IdentifierNode.js';

export const standardVOEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.StandardVOEvaluationContext,
): DTOEvaluationNode => {
  const dtoIdentifierNode: IdentifierNode = thisVisitor.visit(ctx.upperCaseIdentifier());
  const fieldList = thisVisitor.visit(ctx.evaluationFieldList());

  const dtoEvaluationNode = new StandardVOEvaluationNodeBuilder()
    .withIdentifier(dtoIdentifierNode)
    .withEvaluationFieldList(fieldList)
    .build();

  return dtoEvaluationNode;
};
