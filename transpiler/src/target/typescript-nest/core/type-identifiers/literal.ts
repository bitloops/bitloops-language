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
  IntegerLiteral,
  DecimalLiteral,
  TLiteralValues,
  TNumericLiteral,
  TNumericLiteralValues,
  StringLiteral,
  BooleanLiteral,
  NullLiteral,
  TemplateStringLiteral,
  TRegexLiteral,
} from '../../../../types.js';

export class LiteralTypeIdentifiers {
  static isStringLiteral(literalValue: TLiteralValues): literalValue is StringLiteral {
    if (this.isObject(literalValue) && 'stringLiteral' in literalValue) {
      return true;
    }
    return false;
  }

  static isBooleanLiteral(literalValue: TLiteralValues): literalValue is BooleanLiteral {
    if (this.isObject(literalValue) && 'booleanLiteral' in literalValue) {
      return true;
    }
    return false;
  }

  static isTemplateStringLiteral(
    literalValue: TLiteralValues,
  ): literalValue is TemplateStringLiteral {
    if (this.isObject(literalValue) && 'templateStringLiteral' in literalValue) {
      return true;
    }
    return false;
  }

  static isRegexLiteral(literalValue: TLiteralValues): literalValue is TRegexLiteral {
    return this.isObject(literalValue) && 'regexLiteral' in literalValue;
  }

  static isNullLiteral(literalValue: TLiteralValues): literalValue is NullLiteral {
    if (this.isObject(literalValue) && 'nullLiteral' in literalValue) {
      return true;
    }
    return false;
  }

  static isNumericLiteral(literalValue: TLiteralValues): literalValue is TNumericLiteral {
    if (this.isObject(literalValue) && 'numericLiteral' in literalValue) {
      return true;
    }
    return false;
  }

  static isIntegerNumericLiteral(
    numericLiteral: TNumericLiteralValues,
  ): numericLiteral is IntegerLiteral {
    if (this.isObject(numericLiteral) && 'integerLiteral' in numericLiteral) {
      return true;
    }
    return false;
  }

  static isDecimalNumericLiteral(
    numericLiteral: TNumericLiteralValues,
  ): numericLiteral is DecimalLiteral {
    if (this.isObject(numericLiteral) && 'decimalLiteral' in numericLiteral) {
      return true;
    }
    return false;
  }

  private static isObject(val): boolean {
    return typeof val === 'object' && !Array.isArray(val) && val !== null;
  }
}
