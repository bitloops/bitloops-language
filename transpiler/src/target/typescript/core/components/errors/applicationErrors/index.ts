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
  TApplicationError,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  ApplicationErrorKey,
  ApplicationErrorIdentifier,
  TApplicationErrorValue,
} from '../../../../../../types.js';
import { getErrorValues } from '../index.js';

const applicationErrorsToTargetLanguage = (
  domainError: TApplicationError,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];
  const applicationErrorName = domainError[ApplicationErrorKey][ApplicationErrorIdentifier];
  const applicationErrorValue = domainError[ApplicationErrorKey];
  const domainErrorToTargetLang = applicationErrorToTargetLanguage(
    applicationErrorValue,
    applicationErrorName,
  );
  result += domainErrorToTargetLang.output;
  dependencies = [...dependencies, ...domainErrorToTargetLang.dependencies];
  return { output: result, dependencies };
};

const applicationErrorToTargetLanguage = (
  variable: TApplicationErrorValue,
  applicationErrorName: string,
): TTargetDependenciesTypeScript => {
  const { messageResult, errorIdText, parametersResult } = getErrorValues(variable);

  // const messageExpression = message.expression;
  // const messageResult = modelToTargetLanguage({
  //   type: BitloopsTypesMapping.TExpressionValues,
  //   value: messageExpression,
  // });
  // const errorIdRegularEval = errorId.expression;

  // const errorIdText = modelToTargetLanguage({
  //   type: BitloopsTypesMapping.TExpressionValues,
  //   value: errorIdRegularEval,
  // });
  // const errorIdResult = modelToTargetLanguage({
  //   type: BitloopsTypesMapping.TString,
  //   value: errorIdText,
  // });
  // const parametersResult = modelToTargetLanguage({
  //   type: BitloopsTypesMapping.TParameterList,
  //   value: parameters ?? [],
  // });
  const dependencies: TDependenciesTypeScript = [
    {
      type: 'absolute',
      default: false,
      value: 'Application',
      from: '@bitloops/bl-boilerplate-core',
    },
  ];

  let result = `export class ${applicationErrorName} extends Application.Error { constructor`;
  result += parametersResult.output;
  result += '{ super(';
  result += messageResult.output;
  result += ', ';
  result += errorIdText.output;
  result += '); }}';
  return {
    output: result,
    dependencies: [
      ...dependencies,
      ...parametersResult.dependencies,
      ...messageResult.dependencies,
      ...errorIdText.dependencies,
    ],
  };
};
export { applicationErrorsToTargetLanguage };
