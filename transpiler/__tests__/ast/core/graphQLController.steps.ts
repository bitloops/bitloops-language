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
import { validGraphQLControllerDeclarationCases } from './mocks/controllers/graphQLController.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('GraphQL controller declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validGraphQLControllerDeclarationCases.forEach((testGraphQLController) => {
    test(`${testGraphQLController.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testGraphQLController.fileId,
          fileContents: testGraphQLController.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const graphQLControllerNodes = resultTree.getClassTypeNodes(
        BitloopsTypesMapping.TGraphQLController,
      );
      expect(graphQLControllerNodes.length).toBe(1);
      const value = graphQLControllerNodes[0].getValue();

      expect(value).toMatchObject(testGraphQLController.expected);
    });
  });
});
