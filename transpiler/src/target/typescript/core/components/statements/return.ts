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
  TReturnStatement,
  TReturnOKStatement,
  TReturnErrorStatement,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const returnToTargetLanguage = (variable: TReturnStatement): TTargetDependenciesTypeScript => {
  if (!variable.return) {
    throw new Error('Return statement must have a return value');
  }

  const expressionValue = modelToTargetLanguage({ type: 'TExpression', value: variable.return });
  const propsVariableLangMapping = (expressionValue: string): string => `return ${expressionValue}`;
  return {
    output: propsVariableLangMapping(expressionValue.output),
    dependencies: expressionValue.dependencies,
  };
};

// returnOK
const returnOkToTargetLanguage = (variable: TReturnOKStatement): TTargetDependenciesTypeScript => {
  if (!variable.returnOK) {
    throw new Error('ReturnOK statement must have a returnOK value');
  }

  const expressionValue = modelToTargetLanguage({ type: 'TExpression', value: variable.returnOK });
  const propsVariableLangMapping = (expressionValue: TTargetDependenciesTypeScript): string =>
    `return ok(${expressionValue.output})`;
  return {
    output: propsVariableLangMapping(expressionValue),
    dependencies: expressionValue.dependencies,
  };
};

//returnError
const returnErrorToTargetLanguage = (
  variable: TReturnErrorStatement,
): TTargetDependenciesTypeScript => {
  if (!variable.returnError) {
    throw new Error('ReturnError statement must have a returnError value');
  }

  const expressionValue = modelToTargetLanguage({
    type: 'TExpression',
    value: variable.returnError,
  });
  const propsVariableLangMapping = (expressionValue: TTargetDependenciesTypeScript): string =>
    `return oops(${expressionValue.output})`;
  return {
    output: propsVariableLangMapping(expressionValue),
    dependencies: expressionValue.dependencies,
  };
};

// const returnStatement: TReturnErrorStatement = {
//   returnError: {
//     evaluation: {
//       regularEvaluation: {
//         type: 'string',
//         value: 'test',
//       },
//     },
//   },
// };
// console.log(JSON.stringify(returnStatement));

// console.log(returnErrorToTargetLanguage(returnStatement, SupportedLanguages.TypeScript));

export { returnToTargetLanguage, returnOkToTargetLanguage, returnErrorToTargetLanguage };
