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
import { TEvaluationFields } from '../../../../types.js';

// export type TEvaluationFields = ({ name: string } & TExpression)[];
export const evaluationFieldListVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EvaluationFieldListContext,
): TEvaluationFields => {
  const evaluationFieldsAndCommas = thisVisitor.visitChildren(ctx);
  //   console.log('evaluationFieldsAndCommas', evaluationFieldsAndCommas);
  const evaluationFields = evaluationFieldsAndCommas.filter(
    (evaluationFieldOrComma) => evaluationFieldOrComma !== undefined,
  );
  return evaluationFields as TEvaluationFields;

  //   if (ctx.statementList()) {
  //     return thisVisitor.visit(ctx.statementList());
  //   } else return null;
};
