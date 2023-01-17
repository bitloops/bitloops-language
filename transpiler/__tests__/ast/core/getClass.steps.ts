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

import { BitloopsParser } from '../../../src/parser/index.js';
import { IntermediateASTParser } from '../../../src/ast/core/index.js';

import { OriginalAST, ParserSyntacticError } from '../../../src/parser/core/types.js';
import { TExpression } from '../../../src/types.js';
import { ExpressionBuilderDirector } from './builders/expressionDirector.js';
import { validGetClassExpressions } from './mocks/getClass.js';
const boundedContext = 'Hello World';
const module = 'core';
let result;

describe('Valid getClass expressions', () => {
  validGetClassExpressions.forEach((mock) => {
    test(`${mock.description}`, () => {
      const parser = new BitloopsParser();
      const initialModelOutput = parser.parse({
        core: [
          {
            boundedContext,
            module,
            fileId: mock.fileId,
            fileContents: mock.inputBLString,
          },
        ],
      });
      const intermediateParser = new IntermediateASTParser();
      if (!(initialModelOutput instanceof ParserSyntacticError)) {
        result = intermediateParser.parse(initialModelOutput as unknown as OriginalAST);
        const tree = result.core[boundedContext][module];
        result = tree.getCurrentNode().getValue();
      }
      const expected = getExpected(mock.expression);
      expect(result).toMatchObject(expected);
    });
  });
});

const getExpected = (expression: TExpression): TExpression =>
  new ExpressionBuilderDirector().buildGetClassExpression(expression);
