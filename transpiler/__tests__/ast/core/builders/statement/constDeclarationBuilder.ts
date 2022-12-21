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
    this.type = { [bitloopsPrimaryTypeKey]: { [primitivesTypeKey]: primitiveType } };
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): ConstDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): ConstDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): ConstDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: arrayType };
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
      constDeclaration[constDeclarationKey][bitloopsPrimaryTypeKey] =
        this.type[bitloopsPrimaryTypeKey];
    }

    return constDeclaration;
  }
}
