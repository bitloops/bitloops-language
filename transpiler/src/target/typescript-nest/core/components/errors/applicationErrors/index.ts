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
import { ClassTypes } from '../../../../../../helpers/mappings.js';
import {
  TApplicationError,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  ApplicationErrorKey,
  ApplicationErrorIdentifier,
  TApplicationErrorValue,
} from '../../../../../../types.js';
import { getParentDependencies } from '../../../dependencies.js';
import { getErrorValues } from '../index.js';

const applicationErrorsToTargetLanguage = (
  applicationError: TApplicationError,
): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];
  const applicationErrorName = applicationError[ApplicationErrorKey][ApplicationErrorIdentifier];
  const applicationErrorValue = applicationError[ApplicationErrorKey];
  const applicationErrorToTargetLang = applicationErrorToTargetLanguage(
    applicationErrorValue,
    applicationErrorName,
  );
  result += applicationErrorToTargetLang.output;
  dependencies = [...dependencies, ...applicationErrorToTargetLang.dependencies];
  return { output: result, dependencies };
};

const applicationErrorToTargetLanguage = (
  variable: TApplicationErrorValue,
  applicationErrorName: string,
): TTargetDependenciesTypeScript => {
  const { messageResult, errorIdText, parametersResult } = getErrorValues(variable);

  const dependencies: TDependenciesTypeScript = [
    {
      type: 'absolute',
      default: false,
      value: 'Application',
      from: '@bitloops/bl-boilerplate-core',
    },
  ];

  let result = `export class ${applicationErrorName} extends Application.Error { 
    static readonly errorId:string = ${errorIdText.output};
    constructor`;
  result += parametersResult.output;
  result += '{ super(';
  result += messageResult.output;
  result += ', ';
  result += `${applicationErrorName}.errorId`;
  // result += errorIdText.output;
  result += '); }}';

  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.ApplicationError,
    className: applicationErrorName,
  });

  return {
    output: result,
    dependencies: parentDependencies,
    // ...parametersResult.dependencies,
    // ...messageResult.dependencies,
    // ...errorIdText.dependencies,
  };
};
export { applicationErrorsToTargetLanguage };
