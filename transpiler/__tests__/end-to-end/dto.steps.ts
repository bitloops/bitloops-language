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
import { transpiler } from '../../src/refactoring-arch/index.js';
import { formatString } from '../../src/target/typescript/core/codeFormatting.js';
import { DTO_END_TO_END_TEST_CASES } from './mocks/dto.js';

describe('Valid DTO End To End', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const fileId = 'fileName';
  const classType = ClassTypes.DTOs;
  const options = {
    formatterConfig: null,
    targetLanguage: 'TypeScript',
  };

  //   const parser = new BitloopsParser();
  //   const originalLanguageASTToIntermediateModelTransformer = new BitloopsIntermediateASTParser();
  //   const targetLanguageASTToTargetCodeGenerator = new BitloopsTargetGenerator();

  //   const transpiler = new Transpiler(
  //     parser,
  //     originalLanguageASTToIntermediateModelTransformer,
  //     targetLanguageASTToTargetCodeGenerator,
  //   );

  DTO_END_TO_END_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const input = [
        {
          boundedContext,
          module,
          fileId,
          fileContents: testCase.input,
        },
      ];

      // when
      const result = transpiler.transpile(input, options);

      // then
      const formattedOutput = formatString(testCase.output as string, options.formatterConfig);
      const expectedOutput = [
        {
          boundedContext,
          module,
          classType,
          className: testCase.className,
          fileContent: formattedOutput,
        },
      ];

      expect(result).toEqual(expectedOutput);
    });
  });
});
