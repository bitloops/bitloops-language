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
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isIntermediateASTValidationErrors } from '../../../src/ast/core/guards/index.js';
import { isParserErrors } from '../../../src/parser/core/guards/index.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { validIntegrationEventTestCases } from './mocks/integrationEvent/integrationEvent.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Integration event declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validIntegrationEventTestCases.forEach((testCase) => {
    test(`${testCase.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCase.fileId,
            fileContents: testCase.inputBLString,
          },
        ],
      });

      if (isParserErrors(initialModelOutput)) {
        throw initialModelOutput;
      }

      const parseResult = intermediateParser.parse(initialModelOutput);
      if (isIntermediateASTValidationErrors(parseResult)) {
        throw parseResult;
      }

      const result = intermediateParser.complete(parseResult);
      const { core } = result;
      resultTree = core[BOUNDED_CONTEXT].core;
      const integrationEventNodes = resultTree.getRootChildrenNodesByType(
        BitloopsTypesMapping.TIntegrationEvent,
      );
      const value = integrationEventNodes[0].getValue();

      expect(value).toMatchObject(testCase.expected);
      expect(integrationEventNodes.length).toBe(1);
    });
  });
});
