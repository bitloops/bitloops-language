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
import { StatementDirector } from './../../builders/statement/statementDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { TDefaultCase, TExpression, TRegularCase } from '../../../../../src/types.js';
import { SwitchRegularCaseBuilder } from '../../builders/statement/switch/switchRegularCaseBuilder.js';
import { SwitchDefaultCaseBuilder } from '../../builders/statement/switch/switchDefaultCaseBuilder.js';

type SwitchStatementTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expression: TExpression;
  cases: TRegularCase[];
  defaultCase: TDefaultCase;
};

export const validSwitchStatementTestCases: SwitchStatementTestCase[] = [
  {
    description: 'Simple inline switch statement with 2 cases and default',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestStatement { switch (a) { case 1: {const a = 1;} case 2: {const a = 2;} default: {const a = 3;} } }',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('a'),
    cases: [
      new SwitchRegularCaseBuilder()
        .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(1))
        .withStatement(
          new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
            name: 'a',
            intLiteral: 1,
          }),
        )
        .build(),
      new SwitchRegularCaseBuilder()
        .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(2))
        .withStatement(
          new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
            name: 'a',
            intLiteral: 2,
          }),
        )
        .build(),
    ],
    defaultCase: new SwitchDefaultCaseBuilder()
      .withStatement(
        new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
          name: 'a',
          intLiteral: 3,
        }),
      )
      .build(),
  },
  {
    description:
      'Simple inline switch statement with 2 cases and default, where cases have no curly braces',
    fileId: 'testFile.bl',
    inputBLString:
      'JestTestStatement { switch (a) { case 1: const a = 1; case 2: const a = 2; default: const a = 3; } }',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('a'),
    cases: [
      new SwitchRegularCaseBuilder()
        .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(1))
        .withStatement(
          new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
            name: 'a',
            intLiteral: 1,
          }),
        )
        .build(),
      new SwitchRegularCaseBuilder()
        .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(2))
        .withStatement(
          new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
            name: 'a',
            intLiteral: 2,
          }),
        )
        .build(),
    ],
    defaultCase: new SwitchDefaultCaseBuilder()
      .withStatement(
        new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
          name: 'a',
          intLiteral: 3,
        }),
      )
      .build(),
  },
  {
    description: 'Multi-line switch Statement with const declarations and breaks',
    fileId: 'testFile.bl',
    inputBLString: `JestTestStatement { switch (x-y) {
    case 0:{
        const res = n;
        break;
        }
    default:{
        const res = z;
        }
  }}`,
    expression: new ExpressionBuilderDirector().buildAdditiveExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('x'),
      new ExpressionBuilderDirector().buildIdentifierExpression('y'),
      '-',
    ),
    cases: [
      new SwitchRegularCaseBuilder()
        .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(0))
        .withStatement(
          new StatementDirector().buildConstDeclarationWithIdentifier({
            name: 'res',
            valueIdentifier: 'n',
          }),
        )
        .withStatement(new StatementDirector().buildBreakStatement())
        .build(),
    ],
    defaultCase: new SwitchDefaultCaseBuilder()
      .withStatement(
        new StatementDirector().buildConstDeclarationWithIdentifier({
          name: 'res',
          valueIdentifier: 'z',
        }),
      )
      .build(),
  },
];
