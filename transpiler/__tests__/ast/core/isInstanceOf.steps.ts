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
  BitloopsLanguageASTContext,
  BitloopsParser,
  BitloopsParserError,
} from '../../../src/index.js';
import { TExpression } from '../../../src/types.js';
import { ExpressionBuilderDirector } from './builders/expressionDirector.js';
import { validIsInstanceOfExpressions } from './mocks/isInstanceOf.js';
const boundedContext = 'Hello World';
const module = 'core';
let result;
describe('Valid isInstanceOf expressions', () => {
  validIsInstanceOfExpressions.forEach((mock) => {
    test(`${mock.description}`, () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse([
        {
          boundedContext,
          module,
          fileId: mock.fileId,
          fileContents: mock.inputBLString,
        },
      ]);
      const intermediateParser = new BitloopsIntermediateASTParser();
      if (!(initialModelOutput instanceof BitloopsParserError)) {
        result = intermediateParser.parse(
          initialModelOutput as unknown as BitloopsLanguageASTContext,
        );
        const tree = result[boundedContext][module];
        result = tree.getCurrentNode().getValue();
      }
      const expected = getExpected(mock.expression, mock.class);
      expect(result).toMatchObject(expected);
    });
  });
});

const getExpected = (expression: TExpression, className: string): TExpression =>
  new ExpressionBuilderDirector().buildIsInstanceOfExpression(expression, className);
