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
// import { defineFeature, loadFeature } from 'jest-cucumber';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { IntermediateModelToASTTargetTransformer } from '../../../../src/target-ast/index.js';
import { REST_CONTROLLER_TEST_CASES } from './mocks/controllers/rest.js';

describe('Valid rest Controller', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';

  REST_CONTROLLER_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const expressionNode = testCase.controller;
      tree.insertChild(expressionNode);

      const intermediateModel = {
        [boundedContext]: { [module]: tree },
      };

      // when
      const targetModelTransformer = new IntermediateModelToASTTargetTransformer();
      const result = targetModelTransformer.transform({ intermediateModel });

      //then
      // const formattedOutput = formatString(testCase.outputTree as string, formatterConfig);
      expect(result).not.toBeInstanceOf(Error);
      // TODO Fix this
      // expect(result[0].fileContent).toEqual(formattedOutput);
    });
  });
});
