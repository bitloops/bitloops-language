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
import {
  SEMANTIC_BC_ERRORS_END_TO_END_TEST_CASES,
  SEMANTIC_CORE_ERRORS_END_TO_END_TEST_CASES,
  SEMANTIC_SETUP_ERRORS_END_TO_END_TEST_CASES,
} from './mocks/semantic-errors/semantic-errors.js';
import { IntermediateASTValidationError } from '../../src/ast/core/types.js';
import { BitloopsParser } from '../../src/parser/index.js';
import { IntermediateASTParser, IntermediateASTValidator } from '../../src/ast/core/index.js';
import { TargetGenerator } from '../../src/target/index.js';

describe.skip('Semantic core error End To End', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const options = {
    formatterConfig: null,
    targetLanguage: 'TypeScript',
  };

  SEMANTIC_CORE_ERRORS_END_TO_END_TEST_CASES.forEach((testCase) => {
    const parser = new BitloopsParser();
    const validator = new IntermediateASTValidator();
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
            fileId: testCase.fileIdCore,
            fileContents: testCase.inputCore,
          },
        ],
        setup: [
          {
            boundedContext,
            module,
            fileId: testCase.fileIdSetup,
            fileContents: testCase.inputSetup,
          },
        ],
      };

      // when
      const result = transpiler.transpile(input, options);
      if (!Transpiler.isTranspileError(result)) {
        throw new Error('Transpiler should return error');
      }
      let i = 0;
      result.forEach((error) => {
        expect(error).toBeInstanceOf(IntermediateASTValidationError);
        expect((error as IntermediateASTValidationError).message).toEqual(
          testCase.expectedErrorMessages[i],
        );
        // console.log((error as IntermediateASTValidationError).message);
        i++;
      });
    });
  });
});

describe('Semantic setup error End To End', () => {
  const boundedContext = 'Todo';
  const module = 'Todo';
  const options = {
    formatterConfig: null,
    targetLanguage: 'TypeScript',
  };

  SEMANTIC_SETUP_ERRORS_END_TO_END_TEST_CASES.forEach((testCase) => {
    const parser = new BitloopsParser();
    const validator = new IntermediateASTValidator();
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
            fileId: testCase.fileIdCore,
            fileContents: testCase.inputCore,
          },
        ],
        setup: [
          {
            boundedContext,
            module,
            fileId: testCase.fileIdSetup,
            fileContents: testCase.inputSetup,
          },
        ],
      };

      // when
      const result = transpiler.transpile(input, options);
      if (!Transpiler.isTranspileError(result)) {
        throw new Error('Transpiler should return error');
      }
      let i = 0;
      result.forEach((error) => {
        // console.log('ERROR', error);
        expect(error).toBeInstanceOf(IntermediateASTValidationError);
        expect((error as IntermediateASTValidationError).message).toEqual(
          testCase.expectedErrorMessages[i],
        );
        // console.log((error as IntermediateASTValidationError).message);
        i++;
      });
    });
  });
});

describe.skip('Semantic bounded context errors End To End', () => {
  const options = {
    formatterConfig: null,
    targetLanguage: 'TypeScript',
  };

  SEMANTIC_BC_ERRORS_END_TO_END_TEST_CASES.forEach((testCase) => {
    const boundedContext = 'Demo';
    const module = 'Todo';
    const parser = new BitloopsParser();
    const validator = new IntermediateASTValidator();
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
        core: testCase.core,
        setup: [
          {
            boundedContext,
            module,
            fileId: testCase.fileIdSetup,
            fileContents: testCase.inputSetup,
          },
        ],
      };

      // when
      const result = transpiler.transpile(input, options);
      if (!Transpiler.isTranspileError(result)) {
        throw new Error('Transpiler should return error');
      }
      let i = 0;
      result.forEach((error) => {
        expect(error).toBeInstanceOf(IntermediateASTValidationError);
        expect((error as IntermediateASTValidationError).message).toEqual(
          testCase.expectedErrorMessages[i],
        );
        // console.log((error as IntermediateASTValidationError).message);
        i++;
      });
    });
  });
});
