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
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { isIntermediateASTError } from '../../../src/ast/core/guards/index.js';
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
  const intermediateParser = new IntermediateASTParser();

  validStructDeclarationCases.forEach((testStructDeclaration) => {
    test(`${testStructDeclaration.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testStructDeclaration.fileId,
            fileContents: testStructDeclaration.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const structDeclarationNodes = resultTree.getRootChildrenNodesByType(
        BitloopsTypesMapping.TStruct,
      );
      const value = structDeclarationNodes[0].getValue();

      expect(value).toMatchObject(testStructDeclaration.expected);
      expect(structDeclarationNodes.length).toBe(1);
    });
  });
});

describe('Struct declaration is invalid', () => {
  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();
  invalidStructDeclarationCases.forEach((testStruct) => {
    test(`${testStruct.description}`, () => {
      const res = function (): void {
        const initialModelOutput = parser.parse({
          core: [
            {
              boundedContext: BOUNDED_CONTEXT,
              module: MODULE,
              fileId: testStruct.fileId,
              fileContents: testStruct.inputBLString,
            },
          ],
        });

        if (!isParserErrors(initialModelOutput)) {
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
  const intermediateParser = new IntermediateASTParser();

  validMultipleStructsTestCases.forEach((testDTO) => {
    test(`${testDTO.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testDTO.fileId,
            fileContents: testDTO.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const structNodes = resultTree.getRootChildrenNodesByType(BitloopsTypesMapping.TStruct);
      const values = structNodes.map((node) => node.getValue());

      expect(values).toMatchObject(testDTO.expected);
    });
  });
});
