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
import { EvaluationFieldNode } from '../../../../../../../src/ast/core/intermediate-ast/nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationFieldBuilderDirector } from '../../../builders/evaluationFIeld.js';

type TValidTestCases = {
  description: string;
  evaluationFields: EvaluationFieldNode[];
  output: string;
};

export const VALID_CORS_EVALUATION_TEST_CASES: TValidTestCases[] = [
  {
    description: 'A valid struct declaration with array of int and string',
    evaluationFields: [
      new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField('origin', '*'),
    ],
    output: "{origin:'*'}",
  },
];
