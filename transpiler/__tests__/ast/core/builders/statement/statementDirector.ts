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
  TArgumentList,
  TBreakStatement,
  TConstDeclaration,
  TEvaluationFields,
  TExpression,
  TReturnStatement,
  TStatement,
} from '../../../../../src/types.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { EvaluationFieldBuilderDirector } from '../evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ConstDeclarationBuilderDirector } from './constDeclarationDirector.js';
import { ReturnStatementBuilder } from './returnStatementBuilder.js';

export class StatementDirector {
  buildConstDeclarationWithIntLiteralExpression({
    name,
    intLiteral,
  }: {
    name: string;
    intLiteral: number;
  }): TConstDeclaration {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationWithIntLiteralExpression({
      name,
      intLiteral,
    });
  }

  buildConstDeclarationWithIdentifier({
    name,
    valueIdentifier,
  }: {
    name: string;
    valueIdentifier: string;
  }): TConstDeclaration {
    return new ConstDeclarationBuilderDirector().withIdentifierValue({
      name,
      identifier: valueIdentifier,
    });
  }

  /**
   * const result = useCase.execute();
   */
  buildConstDeclarationWithMemberDotMethodCall(params: {
    name: string;
    memberDotMembers: string[];
    argumentList: TArgumentList;
  }): TConstDeclaration {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationWithMemberDotMethodCallExpression(
      params,
    );
  }

  buildConstDeclarationWithValueObject({
    name,
    valueObjectIdentifier,
    valueObjectFields,
  }: {
    name: string;
    valueObjectIdentifier: string;
    valueObjectFields: { identifier: string; expression: TExpression }[];
  }): TConstDeclaration {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationWithValueObjectEvaluation({
      name,
      valueObjectIdentifier,
      fields: [
        new EvaluationFieldBuilderDirector().buildEvaluationField(
          valueObjectFields[0].identifier,
          valueObjectFields[0].expression,
        ),
      ],
    });
  }

  buildConstDeclarationWithEntity({
    name,
    entityIdentifier,
    entityFields,
  }: {
    name: string;
    entityIdentifier: string;
    entityFields: { identifier: string; expression: TExpression }[];
  }): TConstDeclaration {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationWithEntityEvaluation({
      name,
      entityIdentifier,
      fields: [
        new EvaluationFieldBuilderDirector().buildEvaluationField(
          entityFields[0].identifier,
          entityFields[0].expression,
        ),
        new EvaluationFieldBuilderDirector().buildEvaluationField(
          entityFields[1].identifier,
          entityFields[1].expression,
        ),
      ],
    });
  }

  buildBreakStatement(): TBreakStatement {
    return {
      breakStatement: 'break',
    };
  }

  buildReturnStatement(expression: TExpression): TReturnStatement {
    return new ReturnStatementBuilder().withExpression(expression).build();
  }

  buildExpressionEntityEvaluation(entityName: string, identifierValue: string): TExpression {
    return new ExpressionBuilderDirector().buildEvaluation(
      new EvaluationBuilderDirector().buildEntityEvaluation(entityName, {
        expression: new ExpressionBuilderDirector().buildIdentifierExpression(identifierValue),
      }),
    );
  }

  buildExpressionEntityEvaluationWithFields(
    entityName: string,
    fields: TEvaluationFields,
  ): TExpression {
    return new ExpressionBuilderDirector().buildEvaluation(
      new EvaluationBuilderDirector().buildEntityEvaluation(entityName, {
        fields,
      }),
    );
  }

  /**
   * this.save(response , 'Hello World!');
   */
  buildThisMethodCall(methodName: string, args: TArgumentList): TStatement {
    const methodExpr = new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(
      methodName,
    );
    return new ExpressionBuilderDirector().buildMethodCallExpression(methodExpr, args);
  }
}
