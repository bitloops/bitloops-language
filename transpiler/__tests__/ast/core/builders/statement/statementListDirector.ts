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
import { TEvaluationFields, TStatements } from '../../../../../src/types.js';
import { ArgumentBuilderDirector } from '../argumentDirector.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { StatementDirector } from './statementDirector.js';

export class StatementListDirector {
  buildOneConstDeclarationWithIntLiteralExpression({
    name,
    intLiteral,
  }: {
    name: string;
    intLiteral: number;
  }): TStatements {
    return [
      new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
        name,
        intLiteral,
      }),
    ];
  }

  buildOneReturnStatementWithMethodCallExpression({
    identifierExpressionName,
    methodName,
    argument,
  }: {
    identifierExpressionName: string;
    methodName: string;
    argument: string;
  }): TStatements {
    return [
      new StatementDirector().buildReturnStatement(
        new ExpressionBuilderDirector().buildMethodCallExpression(
          new ExpressionBuilderDirector().buildMemberExpression(
            new ExpressionBuilderDirector().buildIdentifierExpression(identifierExpressionName),
            methodName,
          ),
          [new ArgumentBuilderDirector().buildIdentifierArgument(argument)],
        ),
      ),
    ];
  }

  buildOneBooleanReturnStatement(boolValue: boolean): TStatements {
    const expression = new ExpressionBuilderDirector().buildBooleanLiteralExpression(boolValue);
    return [new StatementDirector().buildReturnStatement(expression)];
  }

  buildOneReturnStatementEntityEvaluation(
    entityName: string,
    identifierValue: string,
  ): TStatements {
    const expressionEntityEvaluation = new ExpressionBuilderDirector().buildEvaluation(
      new EvaluationBuilderDirector().buildEntityEvaluation(entityName, {
        expression: new ExpressionBuilderDirector().buildIdentifierExpression(identifierValue),
      }),
    );
    return [new StatementDirector().buildReturnStatement(expressionEntityEvaluation)];
  }

  buildOneReturnStatementEntityEvaluationWithFields(
    entityName: string,
    fields: TEvaluationFields,
  ): TStatements {
    const expressionEntityEvaluation = new ExpressionBuilderDirector().buildEvaluation(
      new EvaluationBuilderDirector().buildEntityEvaluation(entityName, {
        fields,
      }),
    );
    return [new StatementDirector().buildReturnStatement(expressionEntityEvaluation)];
  }
}
