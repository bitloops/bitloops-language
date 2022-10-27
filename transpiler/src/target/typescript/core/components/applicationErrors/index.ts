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
  TApplicationErrors,
  TApplicationError,
  TString,
  TBackTickString,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const applicationErrorsToTargetLanguage = (
  applicationErrors: TApplicationErrors,
): TTargetDependenciesTypeScript => {
  const applicationErrorsNames = Object.keys(applicationErrors);
  let result = 'export namespace ApplicationErrors {';
  let dependencies = [];
  for (let i = 0; i < applicationErrorsNames.length; i++) {
    const applicationErrorName = applicationErrorsNames[i];
    const applicationError = applicationErrors[applicationErrorName];
    const applicationErrorToTargetLang = applicationErrorToTargetLanguage(
      applicationError,
      applicationErrorName,
    );
    result += applicationErrorToTargetLang.output;
    dependencies = [...dependencies, ...applicationErrorToTargetLang.dependencies];
  }
  result += '}';
  return { output: result, dependencies };
};

const applicationErrorToTargetLanguage = (
  variable: TApplicationError,
  applicationErrorName: string,
): TTargetDependenciesTypeScript => {
  const { message, errorId, parameters } = variable;
  const messageResult = messageToTargetLanguage(message);
  const errorIdResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TString,
    value: errorId,
  });
  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters ?? [],
  });

  let result = `export class ${applicationErrorName} extends Application.Error { constructor`;
  result += parametersResult.output;
  result += '{ super(';
  result += messageResult.output;
  result += ', ';
  result += errorIdResult.output;
  result += '); }}';
  return {
    output: result,
    dependencies: [
      ...parametersResult.dependencies,
      ...messageResult.dependencies,
      ...errorIdResult.dependencies,
    ],
  };
};

const messageToTargetLanguage = (
  message: TString | TBackTickString,
): TTargetDependenciesTypeScript => {
  const messageType = Object.keys(message)[0];
  const messageTypesMapping = {
    backTickString: BitloopsTypesMapping.TBackTickString,
    string: BitloopsTypesMapping.TString,
  };

  const messageResult = modelToTargetLanguage({
    type: messageTypesMapping[messageType],
    value: message,
  });
  return messageResult;
};

export { applicationErrorsToTargetLanguage };
