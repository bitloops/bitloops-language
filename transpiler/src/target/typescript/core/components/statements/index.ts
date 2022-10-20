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
  TEvaluation,
  TStatement,
  TStatements,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
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
  buildInFunction: BitloopsTypesMapping.TBuildInFunction,
};

const statementToTargetLanguage = (variable: TStatement): TTargetDependenciesTypeScript => {
  if (variable === 'break') {
    // TODO break statement object-type like other statements?
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TBreakStatement,
      value: variable,
    });
  }
  const variableKeys = Object.keys(variable);
  const type = variableKeys[0];

  if (!keysToTypeMapping[type]) {
    throw new Error('Unsupported statement: ' + type);
  }
  return modelToTargetLanguage({ type: keysToTypeMapping[type], value: variable });
};

const statementsToTargetLanguage = (variable: TStatements): TTargetDependenciesTypeScript => {
  const elseAdded: string[] = [];
  const mapping = (variable: TStatements): TTargetDependenciesTypeScript[] => {
    return variable.map((statement) => {
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
            });
            const ifAdded = `if (!${constDeclaration.name}.isFail()) {`;
            elseAdded.push(`} else { return fail(${constDeclaration.name}.value) }`);
            return {
              output: `${evaluationRes.output}${ifAdded}`,
              dependencies: evaluationRes.dependencies,
            };
          }
        }
      }

      const result = modelToTargetLanguage({
        type: BitloopsTypesMapping.TStatement,
        value: statement,
      });
      return { output: result.output + ';', dependencies: result.dependencies };
    });
  };
  const targetDependenciesArray = mapping(variable);
  let finalResult = '';
  let finalDependencies = [];
  for (let i = 0; i < targetDependenciesArray.length; i++) {
    finalResult += targetDependenciesArray[i].output;
    finalDependencies = finalDependencies.concat(targetDependenciesArray[i].dependencies);
    // if (i === targetDependenciesArray.length - 1) {
    //   finalResult += elseAdded.join('');
    // }
  }
  if (elseAdded.length > 0) {
    for (let i = elseAdded.length - 1; i >= 0; i -= 1) {
      finalResult += elseAdded[i];
    }
  }

  return { output: finalResult, dependencies: finalDependencies };
};

const statementsWithoutThisToTargetLanguage = (
  variable: TStatements,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const mapping = (variable: TStatements): string => {
    return variable
      .map((statement) => {
        dependencies = [
          ...dependencies,
          ...modelToTargetLanguage({
            type: BitloopsTypesMapping.TStatement,
            value: statement,
          }).dependencies,
        ];
        return (
          modelToTargetLanguage({ type: BitloopsTypesMapping.TStatement, value: statement })
            .output + ';'
        );
      })
      .filter((statement) => statement.includes('this'))
      .join(' ');
  };
  return { output: mapping(variable), dependencies };
};

export {
  statementToTargetLanguage,
  statementsToTargetLanguage,
  statementsWithoutThisToTargetLanguage,
};
