import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  ArrayBitloopsPrimTypeObject,
  bitloopsPrimaryTypeKey,
  constDeclarationKey,
  primitivesTypeKey,
  TBitloopsBuiltInClassesObject,
  TBitloopsIdentifierObject,
  TBitloopsPrimaryType,
  TBitloopsPrimitives,
  TConstDeclaration,
  TExpression,
  TIdentifier,
} from '../../../../../src/types.js';

export class ConstDeclarationBuilder implements IBuilder<TConstDeclaration> {
  private type: TBitloopsPrimaryType;
  private identifier: TIdentifier;
  private expression: TExpression;

  public withPrimitivesType(primitiveType: TBitloopsPrimitives): ConstDeclarationBuilder {
    this.type = { [primitivesTypeKey]: primitiveType };
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): ConstDeclarationBuilder {
    this.type = type;
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): ConstDeclarationBuilder {
    this.type = type;
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): ConstDeclarationBuilder {
    this.type = arrayType;
    return this;
  }

  public withIdentifier(identifier: TIdentifier): ConstDeclarationBuilder {
    this.identifier = identifier;
    return this;
  }

  public withExpression(expression: TExpression): ConstDeclarationBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TConstDeclaration {
    const constDeclaration: TConstDeclaration = {
      [constDeclarationKey]: {
        identifier: this.identifier,
        ...this.expression,
      },
    };

    if (this.type) {
      constDeclaration[constDeclarationKey][bitloopsPrimaryTypeKey] = this.type;
    }

    return constDeclaration;
  }
}
