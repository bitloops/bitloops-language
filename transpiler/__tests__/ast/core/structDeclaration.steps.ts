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
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { BitloopsIntermediateASTParser, BitloopsParser } from '../../../src/index.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import {
  invalidStructDeclarationCases,
  validStructDeclarationCases,
  validMultipleStructsTestCases,
} from './mocks/struct.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Struct declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validStructDeclarationCases.forEach((testStructDeclaration) => {
    test(`${testStructDeclaration.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testStructDeclaration.fileId,
          fileContents: testStructDeclaration.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const structDeclarationNodes = resultTree.getClassTypeNodes(
        BitloopsTypesMapping.TStructDeclaration,
      );
      const value = structDeclarationNodes[0].getValue();

      expect(value).toMatchObject(testStructDeclaration.expected);
      expect(structDeclarationNodes.length).toBe(1);
    });
  });
});

describe('Struct declaration is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();
  invalidStructDeclarationCases.forEach((testStruct) => {
    test(`${testStruct.description}`, () => {
      const res = function (): void {
        const initialModelOutput = parser.parse([
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testStruct.fileId,
            fileContents: testStruct.inputBLString,
          },
        ]);

        if (!isBitloopsParserError(initialModelOutput)) {
          intermediateParser.parse(initialModelOutput);
        }
      };

      expect(res).toThrow();
    });
  });
});

describe('Struct declaration with multiple structs is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validMultipleStructsTestCases.forEach((testDTO) => {
    test(`${testDTO.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testDTO.fileId,
          fileContents: testDTO.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const structNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TStructDeclaration);
      const values = structNodes.map((node) => node.getValue());

      expect(values).toMatchObject(testDTO.expected);
    });
  });
});
