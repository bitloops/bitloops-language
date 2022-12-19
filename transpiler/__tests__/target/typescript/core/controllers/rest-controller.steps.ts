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
import { BitloopsTargetGenerator } from '../../../../../src/target/index.js';
import { formatString } from '../../../../../src/target/typescript/core/codeFormatting.js';
import { ControllerTypeOfDefinition, ISetupData, TServerType } from '../../../../../src/types.js';
import { VALID_REST_CONTROLLER_TEST_CASES } from '../mocks/controllers/restController.js';

describe('Statements test cases', () => {
  const boundedContext = 'Hello world';
  const module = 'demo';
  const formatterConfig = null;
  const language = 'TypeScript';

  VALID_REST_CONTROLLER_TEST_CASES.forEach((testCase) => {
    it(`${testCase.description}`, () => {
      // given
      const tree = new IntermediateASTTree(new IntermediateASTRootNode());
      const input = testCase.controller;

      tree.insertChild(input);

      const intermediateAST = {
        [boundedContext]: { [module]: tree },
      };

      const setupData = generateSetupData({
        boundedContext,
        module,
        controllerName: testCase.controllerName,
        serverType: testCase.serverType,
      });

      const targetGenerator = new BitloopsTargetGenerator();

      // when
      const result = targetGenerator.generate({
        intermediateAST,
        formatterConfig,
        targetLanguage: language,
        setupData,
      });

      //then
      const formattedOutput = formatString(testCase.output, formatterConfig);
      if (result instanceof Error) {
        throw result;
      }
      expect(result[0].fileContent).toEqual(formattedOutput);
    });
  });
});

const generateSetupData = ({
  boundedContext,
  module,
  controllerName,
  serverType,
}: {
  boundedContext: string;
  module: string;
  controllerName: string;
  serverType: TServerType;
}): ISetupData => {
  return {
    controllers: {
      [boundedContext]: {
        [module]: {
          [controllerName]: {
            type: ControllerTypeOfDefinition.REST,
            method: 'get',
            serverType,
            instances: [
              {
                url: '/',
                controllerInstance: 'helloController',
                dependencies: [],
              },
            ],
          },
        },
      },
    },
  };
};