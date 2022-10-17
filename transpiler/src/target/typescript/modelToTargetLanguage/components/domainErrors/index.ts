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
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { TDomainErrors, TDomainError, TBackTickString, TString } from '../../../types.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

const domainErrorsToTargetLanguage = (
  domainErrors: TDomainErrors,
  targetLanguage: string,
): string => {
  const domainErrorsNames = Object.keys(domainErrors);
  let result = 'export namespace DomainErrors {';
  for (let i = 0; i < domainErrorsNames.length; i++) {
    const domainErrorName = domainErrorsNames[i];
    const domainError = domainErrors[domainErrorName];
    result += domainErrorToTargetLanguage(domainError, domainErrorName, targetLanguage);
  }
  result += '}';
  return result;
};

const domainErrorToTargetLanguage = (
  variable: TDomainError,
  domainErrorName: string,
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

  const domainErrorLangMapping: any = {
    [SupportedLanguages.TypeScript]: (
      errorName: string,
      message: string,
      errorId: string,
      parameters: string,
    ) => {
      let result = `export class ${errorName} extends DomainError { constructor`;
      result += parameters;
      result += '{ super(';
      result += message;
      result += ', ';
      result += errorId;
      result += '); }}';
      return result;
    },
  };

  return domainErrorLangMapping[targetLanguage](
    domainErrorName,
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

export { domainErrorsToTargetLanguage };
