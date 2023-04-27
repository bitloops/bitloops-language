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
  TDependenciesTypeScript,
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
  variableDeclaration: BitloopsTypesMapping.TVariableDeclaration,
  builtInFunction: BitloopsTypesMapping.TBuiltInFunction,
  breakStatement: BitloopsTypesMapping.TBreakStatement,
};

const FAIL_DEPENDENCY: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'fail',
    from: '@bitloops/bl-boilerplate-core',
  },
];

const statementToTargetLanguage = (variable: TStatement): TTargetDependenciesTypeScript => {
  const variableKeys = Object.keys(variable);
  const type = variableKeys[0];

  if (!keysToTypeMapping[type]) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    throw new Error(`Unsupported statement:${variable}`);
  }
  return modelToTargetLanguage({ type: keysToTypeMapping[type], value: variable });
};

// TODO move if/else wrapping to second model
const statementsToTargetLanguage = (variable: TStatements): TTargetDependenciesTypeScript => {
  // const elseAdded: string[] = [];
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
            // const ifAdded = `if (!${constDeclaration.identifier}.isFail()) {`;
            // elseAdded.push(`} else { return fail(${constDeclaration.identifier}.value) }`);
            const dependencies = [...evaluationRes.dependencies, ...FAIL_DEPENDENCY];
            return {
              output: `${evaluationRes.output}`,
              dependencies,
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

  // if (elseAdded.length > 0) {
  //   for (let i = elseAdded.length - 1; i >= 0; i -= 1) {
  //     finalResult += elseAdded[i];
  //   }
  // }

  return { output: finalResult, dependencies: finalDependencies };
};

// TODO remove this is probably not needed
const statementsWithoutThisToTargetLanguage = (
  variable: TStatements,
): TTargetDependenciesTypeScript => {
  let finalDependencies = [];
  const mapping = (variable: TStatements): string => {
    return variable
      .map((statement) => {
        const { output, dependencies } = modelToTargetLanguage({
          type: BitloopsTypesMapping.TStatement,
          value: statement,
        });
        finalDependencies = [...finalDependencies, ...dependencies];
        return output + ';';
      })
      .filter((statement) => statement.includes('this'))
      .join(' ');
  };
  return { output: mapping(variable), dependencies: finalDependencies };
};

export {
  statementToTargetLanguage,
  statementsToTargetLanguage,
  statementsWithoutThisToTargetLanguage,
};
