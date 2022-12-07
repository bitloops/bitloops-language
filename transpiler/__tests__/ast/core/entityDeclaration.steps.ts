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
import { BitloopsIntermediateASTParser, BitloopsParser } from '../../../src/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import { validEntityTestCases } from './mocks/entity/entity.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Entity declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validEntityTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testCase.fileId,
          fileContents: testCase.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const entityNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TEntity);
      const value = entityNodes[0].getValue();

      expect(value).toMatchObject(testCase.expected);
      expect(entityNodes.length).toBe(1);
    });
  });
});

// describe('Entity declaration with multiple entities is valid', () => {
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

// type multipleDTOS = { variables: TVariable[]; identifier: TDTOIdentifier }[];

// const getExpectedDTOOutputMultipleDTOS = (dtos: multipleDTOS) => {
//   const resultDTOS = [];
//   for (const { identifier, variables } of dtos) {
//     const dtoValue = new DTODeclarationBuilder()
//       .withIdentifier(identifier)
//       .withVariables(variables)
//       .build();
//     resultDTOS.push(dtoValue);
//   }

//   return resultDTOS;
// };
