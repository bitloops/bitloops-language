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
// import { decode, d } from 'bitloops-gherkin';
import assert from 'assert';
import { TExpression } from './../../../src/types.js';

import { BitloopsIntermediateASTParser, BitloopsParser } from '../../../src/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { TStatements, TIfStatement } from '../../../src/types.js';
import { IntermediateASTTree } from '../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { isBitloopsIntermediateASTError } from '../../../src/ast/core/guards/index.js';
import { isBitloopsParserError } from '../../../src/parser/core/guards/index.js';
import { validIfStatementTestCases } from './mocks/ifStatement.js';
import { IfStatementBuilder } from './builders/IfStatement.js';

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

describe('If Statement is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  validIfStatementTestCases.forEach((testIfStatement) => {
    test(`${testIfStatement.description}`, () => {
      const initialModelOutput = parser.parse([
        {
          boundedContext: BOUNDED_CONTEXT,
          module: MODULE,
          fileId: testIfStatement.fileId,
          fileContents: testIfStatement.inputBLString,
        },
      ]);

      if (!isBitloopsParserError(initialModelOutput)) {
        const result = intermediateParser.parse(initialModelOutput);
        if (!isBitloopsIntermediateASTError(result)) {
          resultTree = result[BOUNDED_CONTEXT][MODULE];
        }
      }
      const expectedNodeValues = getExpectedIFOutput(
        testIfStatement.condition,
        testIfStatement.thenStatements,
        testIfStatement.elseStatements,
      );
      const propsNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TIfStatement);
      assert(propsNodes.length === 1);
      const value = propsNodes[0].getValue();

      expect(value).toMatchObject(expectedNodeValues);
    });
  });
});

const getExpectedIFOutput = (
  condition: TExpression,
  thenStatements: TStatements,
  elseStatements?: TStatements,
): TIfStatement => {
  const ifValue = new IfStatementBuilder()
    .withCondition(condition)
    .withThenStatements(thenStatements);

  if (elseStatements) {
    ifValue.withElseStatements(elseStatements);
  }

  return ifValue.build();
};
