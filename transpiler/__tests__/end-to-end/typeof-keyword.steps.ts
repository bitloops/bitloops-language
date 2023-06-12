import Transpiler from '../../src/Transpiler.js';
import { IntermediateASTParser } from '../../src/ast/core/index.js';
import { BitloopsParser } from '../../src/parser/index.js';
import { TargetGenerator } from '../../src/target/index.js';
import { SYMBOL_TABLE_FIND_TYPE_OF_KEYWORD_TEST_CASES } from './mocks/symbol-table/type-of-keyword/index.js';

describe('Find type of keyword test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  SYMBOL_TABLE_FIND_TYPE_OF_KEYWORD_TEST_CASES.forEach((testCase) => {
    const parser = new BitloopsParser();
    const originalLanguageASTToIntermediateModelTransformer = new IntermediateASTParser();
    const intermediateASTModelToTargetLanguageGenerator = new TargetGenerator();

    const transpiler = new Transpiler(
      parser,
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
      const symbolTable = result.symbolTables[boundedContext];
      const output = symbolTable.findTypeOfKeyword(
        testCase.keywordInfo.name,
        testCase.keywordInfo.position,
      );

      expect(output).toEqual(testCase.expectedOutput);
    });
  });
});
