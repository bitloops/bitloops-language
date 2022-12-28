import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import {
  invalidApplicationErrors,
  validApplicationErrors,
} from './mocks/errors/applicationErrors.js';
import { TApplicationError, TExpression, TIdentifier, TParameterList } from '../../../src/types.js';
import { ApplicationErrorBuilder } from './builders/applicationErrorBuilder.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { isIntermediateASTError } from '../../../src/ast/core/guards/index.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';
const CLASS_TYPE = BitloopsTypesMapping.TApplicationError;
describe('An application error is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validApplicationErrors.forEach((mock) => {
    test(`${mock.description}`, () => {
      const { identifier, message, errorId, parameters } = mock;
      const expectedNodeValues = getExpectedOutput(identifier, message, errorId, parameters);
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: mock.fileId,
            fileContents: mock.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          const { core } = result;
          resultTree = core[BOUNDED_CONTEXT].core;
        }
      }

      const nodes = resultTree.getClassTypeNodes(CLASS_TYPE);
      if (nodes.length > 1) {
        throw new Error('more than one Application Errors detected');
      }
      const value = nodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe.skip('An application error is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();
  invalidApplicationErrors.forEach((mock) => {
    test(`${mock.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: mock.fileId,
            fileContents: mock.inputBLString,
          },
        ],
      });
      if (isParserErrors(initialModelOutput)) {
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
  identifier: TIdentifier,
  messageExp: TExpression,
  errorIdExp: TExpression,
  parameters: TParameterList,
): TApplicationError => {
  const val = new ApplicationErrorBuilder()
    .withIdentifier(identifier)
    .withErrorId(errorIdExp)
    .withMessage(messageExp)
    .withParameters(parameters)
    .build();
  return val;
};
