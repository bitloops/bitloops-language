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
import { validDomainErrors } from './mocks/errors/domainErrors.js';
import { DomainErrorBuilder } from './builders/domaiErrorBuilder.js';
import { TDomainErrors, TExpression } from '../../../src/types.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';
const CLASS_TYPE = BitloopsTypesMapping.TDomainError;
describe('A domain error is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validDomainErrors.forEach((mock) => {
    test(`${mock.description}`, () => {
      const { name, message, errorId } = mock;
      const expectedNodeValues = getExpectedOutput(name, message, errorId);
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
      console.log(value);

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

// describe('DTO declaration with multiple dtos is valid', () => {
//   let resultTree: IntermediateASTTree;

//   const parser = new BitloopsParser();
//   const intermediateParser = new BitloopsIntermediateASTParser();

//   validMultipleDTOSTestCases.forEach((testDTO) => {
//     test(`${testDTO.description}`, () => {
//       const initialModelOutput = parser.parse([
//         {
//           boundedContext: BOUNDED_CONTEXT,
//           module: MODULE,
//           fileId: testDTO.fileId,
//           fileContents: testDTO.inputBLString,
//         },
//       ]);

//       if (!isBitloopsParserError(initialModelOutput)) {
//         const result = intermediateParser.parse(initialModelOutput);
//         if (!isBitloopsIntermediateASTError(result)) {
//           resultTree = result[BOUNDED_CONTEXT][MODULE];
//         }
//       }
//       const expectedNodeValues = getExpectedDTOOutputMultipleDTOS([
//         { variables: testDTO.variables[0], identifier: testDTO.identifier[0] },
//         { variables: testDTO.variables[1], identifier: testDTO.identifier[1] },
//       ]);
//       const dtoNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TDTO);
//       const values = dtoNodes.map((node) => node.getValue());

//       expect(values).toMatchObject(expectedNodeValues);
//     });
//   });
// });
// describe('DTO declaration is invalid', () => {
//   const parser = new BitloopsParser();
//   const intermediateParser = new BitloopsIntermediateASTParser();
//   errorCases.forEach((testDTO) => {
//     test(`${testDTO.description}`, () => {
//       const res = function (): void {
//         const initialModelOutput = parser.parse([
//           {
//             boundedContext: BOUNDED_CONTEXT,
//             module: MODULE,
//             fileId: testDTO.fileId,
//             fileContents: testDTO.inputBLString,
//           },
//         ]);

//         if (!isBitloopsParserError(initialModelOutput)) {
//           intermediateParser.parse(initialModelOutput);
//         }
//       };

//       expect(res).toThrow(TypeError);
//     });
//   });
// });

const getExpectedOutput = (
  name: string,
  messageExp: TExpression,
  errorIdExp: TExpression,
): TDomainErrors => {
  const val = new DomainErrorBuilder()
    .withName(name)
    .withErrorId(errorIdExp)
    .withMessage(messageExp)
    .build();
  return val;
};
