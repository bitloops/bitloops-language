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
  TExpression,
  TForOfStatement,
  TIdentifier,
  TStatements,
} from '../../../../../src/types.js';

export class ForOfStatementBuilder implements IBuilder<TForOfStatement> {
  private identifier: TIdentifier;
  private expression: TExpression;
  private statementList: TStatements;

  public withIdentifier(identifier: TIdentifier): ForOfStatementBuilder {
    this.identifier = identifier;
    return this;
  }

  public withExpression(expression: TExpression): ForOfStatementBuilder {
    this.expression = expression;
    return this;
  }

  public withStatementList(statementList: TStatements): ForOfStatementBuilder {
    this.statementList = statementList;
    return this;
  }

  public build(): TForOfStatement {
    const forOfStatement: TForOfStatement = {
      forOfStatement: {
        identifier: this.identifier,
        statements: this.statementList,
        ...this.expression,
      },
    };

    return forOfStatement;
  }
}
