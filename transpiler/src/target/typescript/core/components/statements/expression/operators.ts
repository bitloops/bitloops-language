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

import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import {
  TMultiplicativeOperator,
  TAdditiveOperator,
  TEqualityOperator,
  TRelationalOperator,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';

enum OPERATORS {
  MULTIPLICATION = '*',
  DIVISION = '/',
  MODULO = '%',
  ADDITION = '+',
  SUBTRACTION = '-',
  LESS_THAN = '<',
  LESS_OR_EQUAL_THAN = '<=',
  GREATER_THAN = '>',
  GREATER_OR_EQUAL_THAN = '>=',
  EQUAL = '==',
  NOT_EQUAL = '!=',
}

export const multiplicativeOperatorToTargetLanguage = (
  operator: TMultiplicativeOperator,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (operator: TMultiplicativeOperator): string | Error => {
      switch (operator) {
        case OPERATORS.MULTIPLICATION:
          return '*';
        case OPERATORS.DIVISION:
          return '/';
        case OPERATORS.MODULO:
          return '%';
        default:
          throw new Error(`Multiplicative operator: ${operator} is not supported`);
      }
    },
  };
  return langMapping[targetLanguage](operator);
};

export const additiveOperatorToTargetLanguage = (
  operator: TAdditiveOperator,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (operator: TAdditiveOperator): string | Error => {
      switch (operator) {
        case OPERATORS.ADDITION:
          return '+';
        case OPERATORS.SUBTRACTION:
          return '-';
        default:
          throw new Error(`Additive operator: ${operator} is not supported`);
      }
    },
  };
  return langMapping[targetLanguage](operator);
};

export const equalityOperatorToTargetLanguage = (
  operator: TEqualityOperator,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (operator: TEqualityOperator): string | Error => {
      switch (operator) {
        case OPERATORS.EQUAL:
          return '==';
        case OPERATORS.NOT_EQUAL:
          return '!=';
        default:
          throw new Error(`Equality operator: ${operator} is not supported`);
      }
    },
  };
  return langMapping[targetLanguage](operator);
};

export const relationalOperatorToTargetLanguage = (
  operator: TRelationalOperator,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const langMapping: any = {
    [SupportedLanguages.TypeScript]: (operator: TRelationalOperator): string | Error => {
      switch (operator) {
        case OPERATORS.GREATER_OR_EQUAL_THAN:
          return '>=';
        case OPERATORS.GREATER_THAN:
          return '>';
        case OPERATORS.LESS_OR_EQUAL_THAN:
          return '<=';
        case OPERATORS.LESS_THAN:
          return '<';
        default:
          throw new Error(`Relational operator: ${operator} is not supported`);
      }
    },
  };
  return langMapping[targetLanguage](operator);
};

// const multi = multiplicativeOperatorToTargetLanguage('*', SupportedLanguages.TypeScript);
// console.log('multi', multi);

// const add = additiveOperatorToTargetLanguage('-', SupportedLanguages.TypeScript);
// console.log('add', add);

// const equal = equalityOperatorToTargetLanguage('==', SupportedLanguages.TypeScript);
// console.log('equal', equal);

// const rel = relationalOperatorToTargetLanguage('<=', SupportedLanguages.TypeScript);
// console.log('rel', rel);
