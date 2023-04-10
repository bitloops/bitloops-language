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

// import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
// import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
// import { getChildDependencies } from './../../../../dependencies.js';
import {
  TLiteral,
  TNumericLiteral,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';

import { LiteralTypeIdentifiers } from './../../../type-identifiers/literal.js';

export const numericLiteralToTargetLanguage = (
  literal: TNumericLiteral,
): TTargetDependenciesTypeScript => {
  const { numericLiteral } = literal;
  if (LiteralTypeIdentifiers.isIntegerNumericLiteral(numericLiteral)) {
    const { integerLiteral } = numericLiteral;
    return { output: `${+integerLiteral.value}`, dependencies: [] };
  }
  if (LiteralTypeIdentifiers.isDecimalNumericLiteral(numericLiteral)) {
    const { decimalLiteral } = numericLiteral;
    return { output: `${+decimalLiteral.value}`, dependencies: [] };
  }

  throw new Error('Numeric Literal not supported');
};

export const literalExpressionToTargetLanguage = (
  variable: TLiteral,
): TTargetDependenciesTypeScript => {
  const { literal } = variable;
  if (LiteralTypeIdentifiers.isStringLiteral(literal)) {
    const { stringLiteral } = literal;
    return { output: `'${stringLiteral}'`, dependencies: [] };
  }

  if (LiteralTypeIdentifiers.isNumericLiteral(literal)) {
    return numericLiteralToTargetLanguage(literal);
  }
  if (LiteralTypeIdentifiers.isBooleanLiteral(literal)) {
    const { booleanLiteral } = literal;
    if (booleanLiteral !== 'true' && booleanLiteral !== 'false') {
      throw new Error(`Invalid boolean value: ${booleanLiteral}`);
    }
    return { output: booleanLiteral, dependencies: [] };
  }

  if (LiteralTypeIdentifiers.isNullLiteral(literal)) {
    return { output: 'null', dependencies: [] };
  }
  // `\`${backTickString}\``
  if (LiteralTypeIdentifiers.isTemplateStringLiteral(literal)) {
    const { templateStringLiteral } = literal;
    return { output: '`' + templateStringLiteral + '`', dependencies: [] };
  }

  if (LiteralTypeIdentifiers.isRegexLiteral(literal)) {
    const { regexLiteral } = literal;
    return { output: regexLiteral, dependencies: [] };
  }

  throw new Error('Literal not supported');
};
