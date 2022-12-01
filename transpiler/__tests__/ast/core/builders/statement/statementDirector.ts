import { TBitloopsPrimitives, TConstDeclaration } from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ConstDeclarationBuilder } from './constDeclarationBuilder.js';

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

  buildConstDeclarationWithMemberExpression({
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
}
