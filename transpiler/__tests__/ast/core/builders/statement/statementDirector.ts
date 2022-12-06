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
  TStatement,
} from '../../../../../src/types.js';
import { ExpressionBuilderDirector } from '../expressionDirector.js';
import { ConstDeclarationBuilderDirector } from './constDeclarationDirector.js';

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

  buildBreakStatement(): TBreakStatement {
    return {
      breakStatement: 'break',
    };
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
