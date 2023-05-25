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
import { ClassTypes } from '../../src/helpers/mappings.js';
import Transpiler from '../../src/Transpiler.js';
import { TOutputTargetContent } from '../../src/target/types.js';
import { transpiler } from '../../src/index.js';
import { SupportedLanguages } from '../../src/target/supportedLanguages.js';
import { formatString } from '../../src/target/typescript-nest/core/codeFormatting.js';
import { ENTITY_PRIMITIVES_END_TO_END_TEST_CASES } from './mocks/entity-primitives/index.js';

describe('Valid fromPrimitives & toPrimitives End To End', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const fileId = 'fileName';
  const options = {
    formatterConfig: null,
    targetLanguage: SupportedLanguages.TypeScriptNest,
  };
  let targetCode: TOutputTargetContent;

  ENTITY_PRIMITIVES_END_TO_END_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const input = {
        core: [
          {
            boundedContext,
            module,
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
        throw new Error('Transpile error');
      }

      // then
      const formattedOutput = formatString(testCase.output as string, options.formatterConfig);
      const entityOutput = targetCode.core.find((item) => item.classType === ClassTypes.RootEntity);
      expect(entityOutput).toBeDefined();

      if (!entityOutput) {
        throw new Error('Entity output not found');
      }
      expect(entityOutput.fileContent).toEqual(formattedOutput);
    });
  });
});
