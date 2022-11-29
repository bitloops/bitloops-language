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
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { BitloopsTargetGenerator } from '../../../../src/target/index.js';
import { formatString } from '../../../../src/target/typescript/core/codeFormatting.js';
// import { modelToTargetLanguage } from '../../../../src/target/typescript/core/modelToTargetLanguage.js';
import { VALID_EXPRESSION_TEST_CASES } from './mocks/expression/expression.js';

// const feature = loadFeature('__tests__/target/typescript/core/expression.feature');

describe('Valid expression test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_EXPRESSION_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const expressionNode = testCase.expression;
      tree.insertChild(expressionNode);

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
//   let expressionType;
//   let result;
//   let value;

//   test('Expression with all possible expression types', ({ given, and, when, then }) => {
//     given(/^type is "(.*)"$/, (type) => {
//       expressionType = type;
//     });

//     and(/^language is "(.*)"$/, (_lang) => {});

//     given(/^I have an expression (.*)$/, (expression) => {
//       value = expression;
//     });

//     when('I generate the code', () => {
//       const expressionValue = JSON.parse(value);
//       result = modelToTargetLanguage({
//         type: expressionType,
//         value: expressionValue,
//       });
//     });

//     then(/^I should see the (.*) code$/, (output) => {
//       expect(result.output).toEqual(output);
//     });
//   });

//   test('Unsupported expression type', ({ given, and, when, then }) => {
//     given(/^type is "(.*)"$/, (type) => {
//       expressionType = type;
//     });

//     and(/^language is "(.*)"$/, (_lang) => {});

//     given(/^I have an invalid (.*) with unsupported (.*)$/, (expression) => {
//       value = expression;
//     });

//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     when('I generate the code', () => {});

//     then(/^I should get an error saying that (.*) is unsupported$/, (expression) => {
//       const expressionValue = JSON.parse(expression);
//       expect(() =>
//         modelToTargetLanguage({
//           type: expressionType,
//           value: expressionValue,
//         }),
//       ).toThrowError(`Unsupported expression: ${expressionValue}`);
//     });
//   });
// });
