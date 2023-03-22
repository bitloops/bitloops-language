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
import Transpiler from '../../src/Transpiler.js';
import { TOutputTargetContent } from '../../src/target/types.js';
import { SETUP_END_TO_END_TEST_CASES } from './mocks/setup/setup.js';
import { transpiler } from '../../src/index.js';
import { IntermediateASTValidationError } from '../../src/ast/core/types.js';

describe('Valid Setup End To End', () => {
  const options = {
    formatterConfig: null,
    targetLanguage: 'TypeScript',
  };
  let targetCode: TOutputTargetContent;

  SETUP_END_TO_END_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, async () => {
      // given
      const input = {
        setup: testCase.inputSetup,
        core: testCase.inputCore,
      };

      // when
      const result = transpiler.transpile(input, options);
      if (!Transpiler.isTranspileError(result)) {
        targetCode = result;
      } else {
        result.forEach((error) => {
          throw new Error((error as IntermediateASTValidationError).message);
        });
      }

      // then
      //   const formattedOutput = formatString(
      //     testCase.expectedOutputs as string,
      //     options.formatterConfig,
      //   );

      expect(targetCode.setup.sort((a, b) => sortStringFields(a.fileId, b.fileId))).toEqual(
        testCase.expectedOutputs.sort((a, b) => sortStringFields(a.fileId, b.fileId)),
      );
    });
  });
});

const sortStringFields = (a: string, b: string): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
