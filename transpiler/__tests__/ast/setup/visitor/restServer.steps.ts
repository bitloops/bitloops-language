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
import { BitloopsParser } from '../../../../src/parser/core/index.js';
import { IntermediateASTParser } from '../../../../src/ast/core/index.js';
import { isIntermediateASTError } from '../../../../src/ast/core/guards/index.js';
import { isParserErrors } from '../../../../src/parser/core/guards/index.js';
import { VALID_REST_SERVER_CASES } from '../mocks/restServerDeclaration/validRestServerCases.js';
import { IntermediateASTSetup } from '../../../../src/ast/core/types.js';
import { BitloopsTypesMapping } from '../../../../src/helpers/mappings.js';

const BOUNDED_CONTEXT = 'Hello world';
const MODULE = 'Demo';

describe('Rest Server is valid', () => {
  let setupResult: IntermediateASTSetup;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  VALID_REST_SERVER_CASES.forEach((testRestServer) => {
    test(`${testRestServer.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: 'fileId',
            fileContents: '',
          },
        ],
        setup: [
          {
            fileContents: testRestServer.inputBLString,
            fileId: testRestServer.fileId,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          setupResult = result.setup;
        }
      }
      const resultTree = setupResult[testRestServer.fileId];
      const value = resultTree.getClassTypeNodes(BitloopsTypesMapping.TServers)[0].getValue();

      expect(value).toMatchObject(testRestServer.restServer);
    });
  });
});

// describe('DTO declaration with multiple dtos is valid', () => {
//   let resultTree: IntermediateASTTree;

//   const parser = new BitloopsParser();
//   const intermediateParser = new IntermediateASTParser();

//   validMultipleDTOSTestCases.forEach((testDTO) => {
//     test(`${testDTO.description}`, () => {
//       const initialModelOutput = parser.parse({
//         core: [
//           {
//             boundedContext: BOUNDED_CONTEXT,
//             module: MODULE,
//             fileId: testDTO.fileId,
//             fileContents: testDTO.inputBLString,
//           },
//         ],
//       });

//       if (!isParserErrors(initialModelOutput)) {
//         const result = intermediateParser.parse(initialModelOutput);
//         if (!isIntermediateASTError(result)) {
//           resultTree = result.core[BOUNDED_CONTEXT][MODULE];
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
//   const intermediateParser = new IntermediateASTParser();
//   errorCases.forEach((testDTO) => {
//     test(`${testDTO.description}`, () => {
//       const res = function (): void {
//         const initialModelOutput = parser.parse({
//           core: [
//             {
//               boundedContext: BOUNDED_CONTEXT,
//               module: MODULE,
//               fileId: testDTO.fileId,
//               fileContents: testDTO.inputBLString,
//             },
//           ],
//         });

//         if (!isParserErrors(initialModelOutput)) {
//           intermediateParser.parse(initialModelOutput);
//         }
//       };

//       expect(res).toThrow(TypeError);
//     });
//   });
// });
