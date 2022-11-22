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
import {
  BitloopsIntermediateASTParser,
  BitloopsIntermediateASTParserError,
  BitloopsLanguageASTContext,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';
import { BitloopsTypesMapping } from '../../../src/helpers/mappings.js';
import { TExpression, TAdditiveOperator } from '../../../src/types.js';
import { IntermediateASTTree } from '../../../src/refactoring-arch/intermediate-ast/IntermediateASTTree.js';

const additiveExpression = [
  {
    inputBLString: 'JestTestExpression { temp1 + temp2}',
    parameters: {
      leftValue: 'temp1',
      rightValue: 'temp2',
      operator: '+',
    },
  },
];

const BOUNDED_CONTEXT = 'Hello World';
const MODULE = 'core';

test('DTO declaration is valid', () => {
  let resultTree: IntermediateASTTree;

  const parser = new BitloopsParser();
  const intermediateParser = new BitloopsIntermediateASTParser();

  additiveExpression.forEach((curr) => {
    const initialModelOutput = parser.parse([
      {
        boundedContext: BOUNDED_CONTEXT,
        module: MODULE,
        fileId: 'testFile.bl',
        fileContents: curr.inputBLString,
      },
    ]);
    if (initialModelOutput instanceof BitloopsParserError) {
      throw initialModelOutput;
    }

    const result = intermediateParser.parse(
      initialModelOutput as unknown as BitloopsLanguageASTContext,
    );

    if (result instanceof BitloopsIntermediateASTParserError) {
      throw result;
    }
    resultTree = result[BOUNDED_CONTEXT][MODULE];
    console.log({ resultTree });
    const { leftValue, rightValue, operator } = curr.parameters;

    const expectedNodeValues = getExpectedAdditiveExpressionValues(
      leftValue,
      rightValue,
      operator as TAdditiveOperator,
    );
    const actualNodes = resultTree.getClassTypeNodes(BitloopsTypesMapping.TAdditiveExpression);
    console.log(actualNodes);
    expect(actualNodes[0].getValue()).toMatchObject(expectedNodeValues);
    // expect(resultValue).toEqual(expectedDTOValue);
  });
});

const getExpectedAdditiveExpressionValues = (
  leftValue: string,
  rightValue: string,
  operator: TAdditiveOperator,
) => {
  const expected: { Tests: { JestTest: TExpression } } = {
    Tests: {
      JestTest: {
        expression: {
          additiveExpression: {
            left: {
              evaluation: {
                regularEvaluation: {
                  type: 'variable',
                  value: leftValue,
                },
              },
            },
            right: {
              evaluation: {
                regularEvaluation: {
                  type: 'variable',
                  value: rightValue,
                },
              },
            },
            operator: operator,
          },
        },
      },
    },
  };

  return expected;
};
