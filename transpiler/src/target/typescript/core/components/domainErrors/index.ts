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
  TDomainErrors,
  TDomainError,
  TString,
  TBackTickString,
  TTargetDependenciesTypeScript,
  TEvaluation,
  TRegularEvaluation,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainErrorsToTargetLanguage = (
  domainErrors: TDomainErrors,
): TTargetDependenciesTypeScript => {
  const domainErrorsNames = Object.keys(domainErrors);
  let result = 'export namespace DomainErrors {';
  let dependencies = [];
  for (let i = 0; i < domainErrorsNames.length; i++) {
    const domainErrorName = domainErrorsNames[i];
    const domainError = domainErrors[domainErrorName];
    const domainErrorToTargetLang = domainErrorToTargetLanguage(domainError, domainErrorName);
    result += domainErrorToTargetLang.output;
    dependencies = [...dependencies, ...domainErrorToTargetLang.dependencies];
  }
  result += '}';
  return { output: result, dependencies };
};

const domainErrorToTargetLanguage = (
  variable: TDomainError,
  domainErrorName: string,
): TTargetDependenciesTypeScript => {
  const { message, errorId, parameters } = variable;

  const messageRegularEval = (message.expression as TEvaluation).evaluation as TRegularEvaluation;
  const messageText: TString = { string: messageRegularEval.regularEvaluation.value };
  const messageResult = messageToTargetLanguage(messageText);
  const errorIdRegularEval = (errorId.expression as TEvaluation).evaluation as TRegularEvaluation;
  const erroIdText: TString = { string: errorIdRegularEval.regularEvaluation.value };
  const errorIdResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TString,
    value: erroIdText,
  });
  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters ?? [],
  });

  let result = `export class ${domainErrorName} extends DomainError { constructor`;
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

export { domainErrorsToTargetLanguage };
