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
import { ExpressionBuilderDirector } from '../../../builders/expressionDirector.js';
import { FileUtil } from '../../../../../../src/utils/file.js';
import { ForOfStatementBuilder } from '../../../builders/statement/forOfStatentBuilder.js';
import { StatementDirector } from '../../../builders/statement/statementDirector.js';
import { TForOfStatement } from '../../../../../../src/types.js';

type ForOfStatementTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expectedForOfStatement: TForOfStatement;
};

export const validForOfStatementTestCases: ForOfStatementTestCase[] = [
  {
    description: 'Simple if statement with no else',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/statements/for-of/forOfStatement.bl',
    ),
    expectedForOfStatement: new ForOfStatementBuilder()
      .withIdentifier('elem')
      .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('elements'))
      .withStatementList([
        new StatementDirector().buildReturnStatement(
          new ExpressionBuilderDirector().buildIdentifierExpression('elem'),
        ),
      ])
      .build(),
  },
];
