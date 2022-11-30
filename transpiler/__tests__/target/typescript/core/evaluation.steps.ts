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
// import { defineFeature, loadFeature } from 'jest-cucumber';
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';

// const feature = loadFeature('__tests__/target/typescript/core/evaluation.feature');

import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
import { VALID_EVALUATION_TEST_CASES } from './mocks/expression/evaluation.js';
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';

// const feature = loadFeature('__tests__/target/typescript/core/expression.feature');

describe('Valid evaluation test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_EVALUATION_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const evaluationNode = testCase.expression;
      tree.insertChild(evaluationNode);

      const intermediateAST = {
        [boundedContext]: { [module]: tree },
      };

      // when
      const targetGenerator = new BitloopsTargetGenerator();
      const result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData: null,
      });

      //then
      const formattedOutput = formatString(testCase.output as string, formatterConfig);
      if (result instanceof Error) {
        throw result;
      }
      expect(result[0].fileContent).toEqual(formattedOutput);
    });
  });
});

// defineFeature(feature, (test) => {
//   let evaluationType;
//   let result;
//   let value;

//   test('Evaluation with all possible evaluation types', ({ given, and, when, then }) => {
//     given(/^type is "(.*)"$/, (type) => {
//       evaluationType = type;
//     });

//     and(/^language is "(.*)"$/, (_lang) => {});

//     given(/^I have an evaluation (.*)$/, (evaluation) => {
//       value = evaluation;
//     });

//     when('I generate the code', () => {
//       const evaluationValue = JSON.parse(value);
//       result = modelToTargetLanguage({
//         type: evaluationType,
//         value: evaluationValue,
//       });
//     });

//     then(/^I should see the (.*) code$/, (output) => {
//       expect(result.output).toEqual(output);
//     });
//   });

//   test('Unsupported evaluation type', ({ given, and, when, then }) => {
//     given(/^type is "(.*)"$/, (type) => {
//       evaluationType = type;
//     });

//     and(/^language is "(.*)"$/, (_lang) => {});

//     given(/^I have an invalid (.*) with unsupported (.*)$/, (evaluation) => {
//       value = evaluation;
//     });

//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     when('I generate the code', () => {});

//     then(/^I should get an error saying that (.*) is unsupported$/, (evaluation) => {
//       const evaluationValue = JSON.parse(evaluation);
//       expect(() =>
//         modelToTargetLanguage({
//           type: evaluationType,
//           value: evaluationValue,
//         }),
//       ).toThrowError(`Unsupported evaluation: ${JSON.stringify(evaluationValue)}`);
//     });
//   });
// });
