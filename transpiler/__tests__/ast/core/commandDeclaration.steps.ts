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

import { IntermediateASTParser } from '../../../src/ast/core/index.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { isParserErrors, isIntermediateASTValidationErrors } from '../../../src/index.js';
import { BitloopsParser } from '../../../src/parser/index.js';
import { validCommandTestCases } from './mocks/command.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Command declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  validCommandTestCases.forEach((testCommandDeclaration) => {
    test(`${testCommandDeclaration.description}`, () => {
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext: BOUNDED_CONTEXT,
            module: MODULE,
            fileId: testCommandDeclaration.fileId,
            fileContents: testCommandDeclaration.inputBLString,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const parseResult = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTValidationErrors(parseResult)) {
          const result = intermediateParser.complete(parseResult);
          resultTree = result.core[BOUNDED_CONTEXT][MODULE];
        }
      }
      const CommandDeclarationNodes = resultTree.getRootChildrenNodesByType(
        BitloopsTypesMapping.TCommand,
      );
      const value = CommandDeclarationNodes[0].getValue();

      expect(value).toMatchObject(testCommandDeclaration.expected);
      expect(CommandDeclarationNodes.length).toBe(1);
    });
  });
});
