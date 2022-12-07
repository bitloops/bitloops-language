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
  TBitloopsPrimitives,
  TConstDeclaration,
  TEvaluationFields,
  TVariableDeclaration,
} from '../../../../../src/types.js';
import { ArgumentListBuilderDirector } from '../argumentListBuilderDirector.js';
import { EvaluationBuilderDirector } from '../evaluationDirector.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ConstDeclarationBuilder } from './constDeclarationBuilder.js';
import { VariableDeclarationBuilder } from './variableDeclarationBuilder.js';

export class ConstDeclarationBuilderDirector {
  private constDeclarationBuilder: ConstDeclarationBuilder;
  constructor() {
    this.constDeclarationBuilder = new ConstDeclarationBuilder();
  }

  buildConstDeclarationWithStringLiteralExpression({
    name,
    stringLiteralExpression,
  }: {
    name: string;
    stringLiteralExpression: string;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteralExpression),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithIntLiteralExpression({
    name,
    intLiteral,
  }: {
    name: string;
    intLiteral: number;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(intLiteral))
      .build();
    return constDeclaration;
  }

  withIdentifierValue({
    name,
    identifier,
  }: {
    name: string;
    identifier: string;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression(identifier))
      .build();
    return constDeclaration;
  }

  buildBuiltInClassEvaluation({
    name,
    builtInClassIdentifier,
    builtInClassArgs,
  }: {
    name: string;
    builtInClassIdentifier: string;
    builtInClassArgs: string[];
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildBuiltInClassEvaluation(
            builtInClassIdentifier,
            new ArgumentListBuilderDirector().buildArgumentList(builtInClassArgs),
          ),
        ),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithMemberThisExpression({
    name,
    rightExpression,
  }: {
    name: string;
    rightExpression: string;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildMemberExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          rightExpression,
        ),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithMemberDotExpression({
    name,
    rightMembers,
  }: {
    name: string;
    rightMembers: string[];
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildMemberExpressionOutOfVariables(...rightMembers),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithDTOEvaluation({
    name,
    dtoIdentifier,
    dtoFields,
  }: {
    name: string;
    dtoIdentifier: string;
    dtoFields: TEvaluationFields;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildDTOEvaluation(dtoIdentifier, dtoFields),
        ),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithStringLiteralExpressionAndType({
    name,
    stringLiteralExpression,
    type,
  }: {
    name: string;
    stringLiteralExpression: string;
    type: TBitloopsPrimitives;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteralExpression),
      )
      .withPrimitivesType(type)
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithValueObjectEvaluation({
    name,
    valueObjectIdentifier,
    fields,
  }: {
    name: string;
    valueObjectIdentifier: string;
    fields: TEvaluationFields;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildValueObjectEvaluation(valueObjectIdentifier, {
            fields,
          }),
        ),
      )
      .build();
    return constDeclaration;
  }

  buildConstDeclarationWithEntityEvaluation({
    name,
    entityIdentifier,
    fields,
  }: {
    name: string;
    entityIdentifier: string;
    fields: TEvaluationFields;
  }): TConstDeclaration {
    const constDeclaration = this.constDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildEvaluation(
          new EvaluationBuilderDirector().buildEntityEvaluation(entityIdentifier, {
            fields,
          }),
        ),
      )
      .build();
    return constDeclaration;
  }
}

export class VariableDeclarationBuilderDirector {
  private variableDeclarationBuilder: VariableDeclarationBuilder;
  constructor() {
    this.variableDeclarationBuilder = new VariableDeclarationBuilder();
  }

  buildVariableDeclarationWithStringLiteralExpression({
    name,
    stringLiteralExpression,
  }: {
    name: string;
    stringLiteralExpression: string;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteralExpression),
      )
      .build();
    return variableDeclaration;
  }

  buildVariableDeclarationWithFloatLiteralExpression({
    name,
    numberExpression,
    type,
  }: {
    name: string;
    numberExpression: number;
    type: TBitloopsPrimitives;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(new ExpressionBuilderDirector().buildFloatLiteralExpression(numberExpression))
      .withPrimitivesType(type)
      .build();
    return variableDeclaration;
  }

  buildVariableDeclarationWithMemberExpression({
    name,
    rightExpression,
  }: {
    name: string;
    rightExpression: string;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildMemberExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          rightExpression,
        ),
      )
      .build();
    return variableDeclaration;
  }

  buildVariableDeclarationWithMemberExpressionAndType({
    name,
    rightExpression,
    type,
  }: {
    name: string;
    rightExpression: string;
    type: TBitloopsPrimitives;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildMemberExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          rightExpression,
        ),
      )
      .withPrimitivesType(type)
      .build();
    return variableDeclaration;
  }

  buildVariableDeclarationWithBooleanAndOrExpressionAndType({
    name,
  }: {
    name: string;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildLogicalAndExpression(
          new ExpressionBuilderDirector().buildParenthesizedExpression(
            new ExpressionBuilderDirector().buildLogicalOrExpression(
              new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
              new ExpressionBuilderDirector().buildBooleanLiteralExpression(false),
            ),
          ),
          new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
        ),
      )
      .withPrimitivesType('bool')
      .build();
    return variableDeclaration;
  }

  buildVariableDeclarationWithStringLiteralExpressionAndType({
    name,
    stringLiteralExpression,
    type,
  }: {
    name: string;
    stringLiteralExpression: string;
    type: TBitloopsPrimitives;
  }): TVariableDeclaration {
    const variableDeclaration = this.variableDeclarationBuilder
      .withIdentifier(name)
      .withExpression(
        new ExpressionBuilderDirector().buildStringLiteralExpression(stringLiteralExpression),
      )
      .withPrimitivesType(type)
      .build();
    return variableDeclaration;
  }
}
