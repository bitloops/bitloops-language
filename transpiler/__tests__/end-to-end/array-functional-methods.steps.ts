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
import { formatString } from '../../src/target/typescript-nest/core/codeFormatting.js';
import { transpiler } from '../../src/index.js';
import { ValidationError } from '../../src/ast/core/types.js';
import { SupportedLanguages } from '../../src/target/supportedLanguages.js';
import { TLanguage } from '../../src/types.js';
import { ARRAY_FUNCTIONAL_METHODS_END_TO_END_TEST_CASES } from './mocks/array-methods/index.js';

describe('Valid functional methods used on arrays End To End', () => {
  const fileId = 'fileName';
  const options = {
    formatterConfig: null,
    targetLanguage: SupportedLanguages.TypeScriptNest as TLanguage,
  };
  let targetCode: TOutputTargetContent;

  ARRAY_FUNCTIONAL_METHODS_END_TO_END_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const input = {
        core: [
          {
            boundedContext: 'test',
            module: 'test',
            fileId,
            fileContents: testCase.input,
          },
        ],
        setup: [],
      };

      // when
      const result = transpiler.transpile(input, options);
      if (!Transpiler.isTranspileError(result)) {
        targetCode = result;
      } else {
        result.forEach((error) => {
          throw new Error((error as ValidationError).message);
        });
      }

      // then
      const formattedOutput = formatString(testCase.output as string, options.formatterConfig);

      expect(targetCode.core[0].fileContent).toEqual(formattedOutput);
    });
  });
});
