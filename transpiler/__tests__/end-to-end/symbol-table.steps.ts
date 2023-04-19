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
import { BitloopsParser } from '../../src/parser/index.js';
import { IntermediateASTParser } from '../../src/ast/core/index.js';
import { TargetGenerator } from '../../src/target/index.js';
import { SemanticAnalyzer } from '../../src/semantic-analysis/IntermediateASTValidator.js';
import {
  SYMBOL_TABLE_MISSING_IDENTIFIERS_TEST_CASES,
  SYMBOL_TABLE_TEST_CASES,
} from './mocks/symbol-table/symbol-table.js';

describe('Symbol table cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';

  SYMBOL_TABLE_TEST_CASES.forEach((testCase) => {
    // if (index !== 3) return; // TODO: remove this line to run all tests (it takes a long time
    const parser = new BitloopsParser();
    const validator = new SemanticAnalyzer();
    const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
    const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

    const transpiler = new Transpiler(
      parser,
      validator,
      originalLanguageASTToIntermediateModelTransformer,
      intermediateASTModelToTargetLanguageGenerator,
    );

    it(`${testCase.description}`, async () => {
      // given
      const input = {
        core: [
          {
            boundedContext,
            module,
            fileId: 'fileId',
            fileContents: testCase.inputCore,
          },
        ],
        setup: [
          {
            boundedContext,
            module,
            fileId: 'fileId',
            fileContents: testCase.inputSetup,
          },
        ],
      };

      // when
      const result = transpiler.getSymbolTable(input);
      if (Transpiler.isTranspilerError(result)) {
        throw new Error('Transpiler should NOT return error');
      }
      // console.log(JSON.stringify(result[boundedContext].getJsonValue(), null, 2));
      // console.log(JSON.stringify(testCase.expectedSymbolTable), null, 2);
      expect(result[boundedContext].getJsonValue()).toEqual(testCase.expectedSymbolTable);
    });
  });

  describe.skip('Missing identifiers test cases', () => {
    SYMBOL_TABLE_MISSING_IDENTIFIERS_TEST_CASES.forEach((testCase) => {
      const parser = new BitloopsParser();
      const validator = new SemanticAnalyzer();
      const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
      const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

      const transpiler = new Transpiler(
        parser,
        validator,
        originalLanguageASTToIntermediateModelTransformer,
        intermediateASTModelToTargetLanguageGenerator,
      );

      it(`${testCase.description}`, async () => {
        // given
        const input = {
          core: [
            {
              boundedContext,
              module,
              fileId: 'fileId',
              fileContents: testCase.inputCore,
            },
          ],
          setup: [
            {
              boundedContext,
              module,
              fileId: 'fileId',
              fileContents: testCase.inputSetup,
            },
          ],
        };

        // when
        const result = transpiler.getSymbolTable(input);
        if (!Transpiler.isTranspilerError(result)) {
          throw new Error('Transpiler should return error');
        }
        expect(result.map((x) => x.message)).toEqual(testCase.errorMessages);
      });
    });
  });
});
