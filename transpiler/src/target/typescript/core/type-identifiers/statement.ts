/**
 *  Bitloops Language
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
  TConstDeclaration,
  TThisDeclaration,
  TExpression,
  TReturnStatement,
  TStatement,
  TSwitchStatement,
  TVariableDeclaration,
  TIfStatement,
} from '../../../../types.js';

export class StatementTypeIdentifiers {
  static isIfStatement = (value: TStatement): value is TIfStatement => {
    if (typeof value === 'string') return false;
    if ('ifStatement' in value) return true;
    return false;
  };

  static isConstDeclaration = (value: TStatement): value is TConstDeclaration => {
    if (typeof value === 'string') return false;
    if ('constDeclaration' in value) return true;
    return false;
  };

  static isVariableDeclaration = (value: TStatement): value is TVariableDeclaration => {
    if (typeof value === 'string') return false;
    if ('variableDeclaration' in value) return true;
    return false;
  };

  static isThisDeclaration = (value: TStatement): value is TThisDeclaration => {
    if (typeof value === 'string') return false;
    if ('thisDeclaration' in value) return true;
    else return false;
  };

  static isExpression = (value: TStatement): value is TExpression => {
    if (typeof value === 'string') return false;
    if ('expression' in value) return true;
    return false;
  };

  static isSwitchStatement = (value: TStatement): value is TSwitchStatement => {
    if (typeof value === 'string') return false;
    if ('switchStatement' in value) return true;
    return false;
  };

  static isReturnStatement = (value: TStatement): value is TReturnStatement => {
    if (typeof value === 'string') return false;
    if ('return' in value) return true;
    return false;
  };
}
