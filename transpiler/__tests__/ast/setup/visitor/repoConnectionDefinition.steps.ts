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
import { IntermediateASTSetup } from '../../../../src/ast/core/types.js';
import { BitloopsTypesMapping } from '../../../../src/helpers/mappings.js';
import { VALID_REPO_CONNECTION_DEFINITION_CASES } from '../mocks/repoConnectionDefinition/index.js';

const BOUNDED_CONTEXT = 'Hello world';
const MODULE = 'Demo';

describe('Repo Connection definition is valid', () => {
  let setupResult: IntermediateASTSetup;

  const parser = new BitloopsParser();
  const intermediateParser = new IntermediateASTParser();

  VALID_REPO_CONNECTION_DEFINITION_CASES.forEach((testRepoConnection) => {
    test(`${testRepoConnection.description}`, () => {
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
            fileContents: testRepoConnection.inputBLString,
            fileId: testRepoConnection.fileId,
          },
        ],
      });

      if (!isParserErrors(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isIntermediateASTError(result)) {
          setupResult = result.setup;
        }
      }
      const resultTree = setupResult[testRepoConnection.fileId];
      const repoConnectionDefinitionNodes = resultTree.getRootChildrenNodesByType(
        BitloopsTypesMapping.TRepoConnectionDefinition,
      );
      const value = repoConnectionDefinitionNodes[0].getValue();

      expect(value).toMatchObject(testRepoConnection.repoConnectionDefinition);
    });
  });
});
