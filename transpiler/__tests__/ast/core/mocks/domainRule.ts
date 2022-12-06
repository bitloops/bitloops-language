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
import { TDomainRule } from '../../../../src/types.js';
import { DomainRuleBuilder } from '../builders/domainRuleBuilder.js';
import { ParameterListBuilderDirector } from '../builders/parameterListBuilderDirector.js';
import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

type DomainRuleDeclarationTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  domainRuleDeclaration: TDomainRule;
};

export const validDomainRuleStatementTestCases: DomainRuleDeclarationTestCase[] = [
  {
    description: 'Domain rule declaration with no statements',
    fileId: 'testFile.bl',
    inputBLString: `Rule IsValidTitleRule(title: string) throws DomainErrors.InvalidTitleError {
      isBrokenIf (title.length > 150 OR title.length < 4);
    }`,
    domainRuleDeclaration: new DomainRuleBuilder()
      .withIdentifier('IsValidTitleRule')
      .withParameters(new ParameterListBuilderDirector().buildStringParams('title'))
      .withThrowsError('DomainErrors.InvalidTitleError')
      .withIsBrokenIfCondition(
        new ExpressionBuilderDirector().buildLogicalOrExpression(
          new ExpressionBuilderDirector().buildRelationalExpression(
            new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables('title', 'length'),
            new ExpressionBuilderDirector().buildInt32LiteralExpression(150),
            '>',
          ),
          new ExpressionBuilderDirector().buildRelationalExpression(
            new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables('title', 'length'),
            new ExpressionBuilderDirector().buildInt32LiteralExpression(4),
            '<',
          ),
        ),
      )
      .withBodyStatements([])
      .build(),
  },
];
