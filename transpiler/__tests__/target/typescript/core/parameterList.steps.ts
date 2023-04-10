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
import { VALID_PARAMETER_LIST_TEST_CASES } from './mocks/parameterList.js';

describe('Valid parameter list test cases', () => {
  // const boundedContext = 'Hello world';
  // const module = 'demo';
  // const formatterConfig = null;
  // const language = 'TypeScript';

  VALID_PARAMETER_LIST_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      // const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const input = testCase.parameterList;
      // tree.insertChild(input);

      // // const intermediateAST = {
      // //   [boundedContext]: { [module]: tree },
      // // };

      // when
      // const targetGenerator = new BitloopsTargetGenerator();
      // const result = targetGenerator.generate({
      //   intermediateAST,
      //   formatterConfig,
      //   targetLanguage: language,
      //   setupData: null,
      // });

      const result = modelToTargetLanguage({
        type: BitloopsTypesMapping.TParameterList,
        value: input.getValue(),
      });

      //then
      expect(result.output).toEqual(testCase.output);

      // const formattedOutput = formatString(testCase.output as string, formatterConfig);
      // if (result instanceof Error) {
      //   throw result;
      // }
      // expect(result[0].fileContent).toEqual(formattedOutput);
    });
  });
});
