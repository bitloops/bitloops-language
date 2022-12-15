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

import assert from 'assert';
import { BitloopsIntermediateASTParser, BitloopsParser } from '../../../src/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import { validRestControllerStatementTestCases } from './mocks/controllers/restController.js';
import { RestControllerBuilder } from './builders/controllers/restControllerBuilder.js';
import {
  TParameterList,
  TRESTController,
  TRESTControllerExecute,
  TRestMethods,
} from '../../../src/types.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('Rest controller declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validRestControllerStatementTestCases.forEach((testCase) => {
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

      const restControllerNodes = resultTree.getClassTypeNodes(
        BitloopsTypesMapping.TRESTController,
      );
      assert(restControllerNodes.length === 1);
      const value = restControllerNodes[0].getValue();
      const expectedValue = getExpectedRestControllerOutput(testCase);

      expect(value).toMatchObject(expectedValue);
    });
  });
});

const getExpectedRestControllerOutput = ({
  RESTControllerIdentifier,
  parameters,
  method,
  execute,
}: {
  RESTControllerIdentifier: string;
  parameters: TParameterList;
  method: TRestMethods;
  execute: TRESTControllerExecute;
}): TRESTController => {
  const controller = new RestControllerBuilder()
    .withIdentifier(RESTControllerIdentifier)
    .withParameters(parameters)
    .withMethod(method)
    .withExecute(execute)
    .build();

  return controller;
};
