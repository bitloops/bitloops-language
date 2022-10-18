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

import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TStatement, TStatements } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const keysToTypeMapping = {
  ifStatement: BitloopsTypesMapping.TIfStatement,
  switchStatement: BitloopsTypesMapping.TSwitchStatement,
  return: BitloopsTypesMapping.TReturnStatement,
  returnOK: BitloopsTypesMapping.TReturnOKStatement,
  returnError: BitloopsTypesMapping.TReturnErrorStatement,
  constDecomposition: BitloopsTypesMapping.TConstDecomposition,
  constDeclaration: BitloopsTypesMapping.TConstDeclaration,
  expression: BitloopsTypesMapping.TExpression,
  thisDeclaration: BitloopsTypesMapping.TThisDeclaration,
  variableDeclaration: BitloopsTypesMapping.TVariableDeclaration,
};

const statementToTargetLanguage = (variable: TStatement, targetLanguage: string): string => {
  if (variable === 'break') {
    // TODO break statement object-type like other statements?
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TBreakStatement,
      value: variable,
      targetLanguage,
    });
  }
  const variableKeys = Object.keys(variable);
  const type = variableKeys[0];

  if (!keysToTypeMapping[type]) {
    throw new Error('Unsupported statement: ' + type);
  }
  return modelToTargetLanguage({ type: keysToTypeMapping[type], value: variable, targetLanguage });
};

const statementsToTargetLanguage = (variable: TStatements, targetLanguage: string): string => {
  console.log('statementsToTargetLanguage', variable);

  const mapping = {
    [SupportedLanguages.TypeScript]: (variable: TStatements): string => {
      return variable
        .map(
          (statement) =>
            modelToTargetLanguage({ type: BitloopsTypesMapping.TStatement, value: statement }) +
            ';',
        )
        .join(' ');
    },
  };

  return mapping[targetLanguage](variable);
};

const statementsWithoutThisToTargetLanguage = (
  variable: TStatements,
  targetLanguage: string,
): string => {
  console.log('statementsWithoutThisToTargetLanguage', variable);
  const mapping = {
    [SupportedLanguages.TypeScript]: (variable: TStatements): string => {
      console.log('var', variable);
      return variable
        .map(
          (statement) =>
            modelToTargetLanguage({ type: BitloopsTypesMapping.TStatement, value: statement }) +
            ';',
        )
        .filter((statement) => statement.includes('this'))
        .join(' ');
    },
  };
  console.log('before return');
  return mapping[targetLanguage](variable);
};

export {
  statementToTargetLanguage,
  statementsToTargetLanguage,
  statementsWithoutThisToTargetLanguage,
};
