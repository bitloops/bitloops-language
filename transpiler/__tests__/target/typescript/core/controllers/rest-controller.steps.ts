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

import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { TargetGenerator } from '../../../../../src/target/index.js';
import { formatString } from '../../../../../src/target/typescript-nest/core/codeFormatting.js';
import { VALID_REST_CONTROLLER_TEST_CASES } from '../mocks/controllers/restController.js';

describe('Statements test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = 'TypeScript-Nest';

  VALID_REST_CONTROLLER_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const input = testCase.controller;
      tree.insertChild(input);

      const setupTree = new IntermediateASTTree(new IntermediateASTRootNode());
      if (testCase.routerController) {
        setupTree.insertChild(testCase.routerController);
      }

      const intermediateAST = {
        core: { [boundedContext]: { [module]: tree } },
        setup: {
          setup: setupTree,
        },
      };

      const targetGenerator = new TargetGenerator();

      // when
      const result = targetGenerator.generate(intermediateAST, {
        formatterConfig,
        targetLanguage: language,
      });

      //then
      const formattedOutput = formatString(testCase.output, formatterConfig);
      if (result instanceof Error) {
        throw result;
      }
      expect(result['core'][0].fileContent).toEqual(formattedOutput);
    });
  });
});
