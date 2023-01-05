import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { invalidDomainErrors, validDomainErrors } from './mocks/errors/domainErrors.js';
import { DomainErrorBuilder } from './builders/domaiErrorBuilder.js';
import { TDomainError, TExpression, TIdentifier, TParameterList } from '../../../src/types.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { isIntermediateASTError } from '../../../src/ast/core/guards/index.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';
const CLASS_TYPE = BitloopsTypesMapping.TDomainError;
describe('A domain error is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validDomainErrors.forEach((mock) => {
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

      const nodes = resultTree.getRootChildrenNodesByType(CLASS_TYPE);
      if (nodes.length > 1) {
        throw new Error('more than one Domain Errors detected');
      }
      const value = nodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});
describe.skip('A domain error is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();
  invalidDomainErrors.forEach((mock) => {
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
): TDomainError => {
  const val = new DomainErrorBuilder()
    .withIdentifier(identifier)
    .withErrorId(errorIdExp)
    .withMessage(messageExp)
    .withParameters(parameters)
    .build();
  return val;
};
