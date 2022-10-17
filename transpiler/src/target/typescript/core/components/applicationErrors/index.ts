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
import {
  TApplicationErrors,
  TApplicationError,
  TString,
  TBackTickString,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const applicationErrorsToTargetLanguage = (
  applicationErrors: TApplicationErrors,
  targetLanguage: string,
): string => {
  const applicationErrorsNames = Object.keys(applicationErrors);
  let result = 'export namespace ApplicationErrors {';
  for (let i = 0; i < applicationErrorsNames.length; i++) {
    const applicationErrorName = applicationErrorsNames[i];
    const applicationError = applicationErrors[applicationErrorName];
    result += applicationErrorToTargetLanguage(
      applicationError,
      applicationErrorName,
      targetLanguage,
    );
  }
  result += '}';
  return result;
};

const applicationErrorToTargetLanguage = (
  variable: TApplicationError,
  applicationErrorName: string,
  targetLanguage: string,
): string => {
  const { message, errorId, parameters } = variable;
  const messageResult = messageToTargetLanguage(message, targetLanguage);
  const errorIdResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TString,
    value: errorId,
    targetLanguage,
  });
  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters ?? [],
    targetLanguage,
  });

  const applicationErrorLangMapping: any = {
    [SupportedLanguages.TypeScript]: (
      errorName: string,
      message: string,
      errorId: string,
      parameters: string,
    ) => {
      let result = `export class ${errorName} extends ApplicationError { constructor`;
      result += parameters;
      result += '{ super(';
      result += message;
      result += ', ';
      result += errorId;
      result += '); }}';
      return result;
    },
  };

  return applicationErrorLangMapping[targetLanguage](
    applicationErrorName,
    messageResult,
    errorIdResult,
    parametersResult,
  );
};

const messageToTargetLanguage = (
  message: TString | TBackTickString,
  targetLanguage: string,
): string => {
  const messageType = Object.keys(message)[0];
  const messageTypesMapping = {
    backTickString: BitloopsTypesMapping.TBackTickString,
    string: BitloopsTypesMapping.TString,
  };

  const messageResult = modelToTargetLanguage({
    type: messageTypesMapping[messageType],
    value: message,
    targetLanguage,
  });
  return messageResult;
};

export { applicationErrorsToTargetLanguage };
