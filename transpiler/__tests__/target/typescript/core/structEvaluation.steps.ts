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
import { BitloopsTypesMapping } from '../../../../src/helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../src/target/typescript-nest/core/modelToTargetLanguage.js';
import { EvaluationBuilderDirector } from './builders/evaluation.js';
import { VALID_STRUCT_EVALUATION_TEST_CASES } from './mocks/statements/evaluation/structEvaluation.js';

describe('Valid struct test cases', () => {
  VALID_STRUCT_EVALUATION_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const structEvaluationNode = new EvaluationBuilderDirector().buildStructEvaluation(
        'myStruct',
        testCase.evaluationfields,
      );

      // when
      const result = modelToTargetLanguage({
        type: BitloopsTypesMapping.TEvaluation,
        value: structEvaluationNode.getValue(),
      });

      //then
      expect(result.output).toEqual(testCase.output);
    });
  });
});
