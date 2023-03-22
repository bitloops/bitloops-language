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
    this.type = { [bitloopsPrimaryTypeKey]: { [primitivesTypeKey]: primitiveType } };
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): VariableDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): VariableDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): VariableDeclarationBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: arrayType };
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
        ...this.type,
        identifier: this.identifier,
        ...this.expression,
      },
    };

    if (this.type) {
      variableDeclaration[variableDeclarationKey][bitloopsPrimaryTypeKey] =
        this.type[bitloopsPrimaryTypeKey];
    }

    return variableDeclaration;
  }
}
