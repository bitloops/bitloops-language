// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
// import expectedModels from '../../../../src/examples/domainError.js';
// import { parseBitloops } from '../../../../src/functions/bitloopsLanguageToModel/BitloopsParser.js';
import { BitloopsParser, BitloopsIntermediateASTParser } from '../../../src/index.js';

// const feature = loadFeature('__tests__/ast/core/domainError.feature');

// TODO make work with backticks and make work to target language

import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import { invalidDomainErrors, validDomainErrors } from './mocks/errors/domainErrors.js';
import { DomainErrorBuilder } from './builders/domaiErrorBuilder.js';
import { TDomainErrors, TExpression, TParameterDependencies } from '../../../src/types.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';
const CLASS_TYPE = BitloopsTypesMapping.TDomainError;
describe('A domain error is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validDomainErrors.forEach((mock) => {
    test(`${mock.description}`, () => {
      const { name, message, errorId, parameters } = mock;
      const expectedNodeValues = getExpectedOutput(name, message, errorId, parameters);
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: mock.fileId,
          fileContents: mock.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }

      const nodes = resultTree.getClassTypeNodes(CLASS_TYPE);
      const value = nodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe('A domain error is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();
  invalidDomainErrors.forEach((mock) => {
    test(`${mock.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: mock.fileId,
          fileContents: mock.inputBLString,
        },
      ]);
      if (isBitloopsParserError(initialModelOutput)) {
        throw initialModelOutput;
      }

      const result = (): void => {
        intermediateParser.parse(initialModelOutput);
      };
      expect(result).toThrow(mock.exception);
    });
  });
});
const getExpectedOutput = (
  name: string,
  messageExp: TExpression,
  errorIdExp: TExpression,
  parameters: TParameterDependencies,
): TDomainErrors => {
  const val = new DomainErrorBuilder()
    .withName(name)
    .withErrorId(errorIdExp)
    .withMessage(messageExp)
    .withParameters(parameters)
    .build();
  return val;
};
