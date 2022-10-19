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
import { TConstDeclaration, TEvaluation, TStatement, TStatements } from '../../../../../types.js';
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
  const elseAdded = [];
  const mapping = {
    [SupportedLanguages.TypeScript]: (variable: TStatements): string => {
      return variable
        .map((statement) => {
          // eslint-disable-next-line no-prototype-builtins
          if (statement.hasOwnProperty('constDeclaration')) {
            const { constDeclaration } = statement as TConstDeclaration;
            const { expression } = constDeclaration;
            if ('evaluation' in expression) {
              const { evaluation } = expression as TEvaluation;
              if ('entity' in evaluation || 'valueObject' in evaluation) {
                const evaluationRes = modelToTargetLanguage({
                  type: BitloopsTypesMapping.TStatement,
                  value: statement,
                  targetLanguage,
                });
                const ifAdded = `if (!${constDeclaration.name}.isFail()) {`;
                elseAdded.push(`} else { return fail(${constDeclaration.name}.value) }`);
                return `${evaluationRes}${ifAdded}`;
              }
            }
          }

          const result = modelToTargetLanguage({
            type: BitloopsTypesMapping.TStatement,
            value: statement,
          });
          return result + ';';
        })
        .join(' ');
    },
  };
  let finalResult = mapping[targetLanguage](variable);
  if (elseAdded.length > 0) {
    for (let i = elseAdded.length - 1; i >= 0; i -= 1) {
      finalResult += elseAdded[i];
    }
  }

  return finalResult;
};

const statementsWithoutThisToTargetLanguage = (
  variable: TStatements,
  targetLanguage: string,
): string => {
  console.log('statementsWithoutThisToTargetLanguage', variable);
  const mapping = {
    [SupportedLanguages.TypeScript]: (variable: TStatements): string => {
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
  return mapping[targetLanguage](variable);
};

export {
  statementToTargetLanguage,
  statementsToTargetLanguage,
  statementsWithoutThisToTargetLanguage,
};
