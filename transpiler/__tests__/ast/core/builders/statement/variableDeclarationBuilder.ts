import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  ArrayBitloopsPrimTypeObject,
  bitloopsPrimaryTypeKey,
  primitivesTypeKey,
  TBitloopsBuiltInClassesObject,
  TBitloopsIdentifierObject,
  TBitloopsPrimaryType,
  TBitloopsPrimitives,
  TExpression,
  TIdentifier,
  TVariableDeclaration,
  variableDeclarationKey,
} from '../../../../../src/types.js';

export class VariableDeclarationBuilder implements IBuilder<TVariableDeclaration> {
  private type: TBitloopsPrimaryType;
  private identifier: TIdentifier;
  private expression: TExpression;

  public withPrimitivesType(primitiveType: TBitloopsPrimitives): VariableDeclarationBuilder {
    this.type = { [primitivesTypeKey]: primitiveType };
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): VariableDeclarationBuilder {
    this.type = type;
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): VariableDeclarationBuilder {
    this.type = type;
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): VariableDeclarationBuilder {
    this.type = arrayType;
    return this;
  }

  public withIdentifier(identifier: TIdentifier): VariableDeclarationBuilder {
    this.identifier = identifier;
    return this;
  }

  public withExpression(expression: TExpression): VariableDeclarationBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TVariableDeclaration {
    const variableDeclaration: TVariableDeclaration = {
      [variableDeclarationKey]: {
        type: this.type,
        identifier: this.identifier,
        ...this.expression,
      },
    };

    if (this.type) {
      variableDeclaration[variableDeclarationKey][bitloopsPrimaryTypeKey] = this.type;
    }

    return variableDeclaration;
  }
}
