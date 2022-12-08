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
  TEvaluation,
  TRegularEvaluation,
  TDependenciesTypeScript,
  ApplicationErrorKey,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const applicationErrorsToTargetLanguage = (
  applicationErrors: TApplicationErrors,
): TTargetDependenciesTypeScript => {
  const applicationErrorsNames = Object.keys(applicationErrors);
  let result = '';
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
  return { output: result, dependencies };
};

// const applicationErrorToTargetLanguage = (
//   variable: TApplicationError,
//   applicationErrorName: string,
// ): TTargetDependenciesTypeScript => {
//   const { message, errorId, parameters } = variable;
//   const messageResult = messageToTargetLanguage(message);
//   const errorIdResult = modelToTargetLanguage({
//     type: BitloopsTypesMapping.TString,
//     value: errorId,
//   });
//   const parametersResult = modelToTargetLanguage({
//     type: BitloopsTypesMapping.TParameterDependencies,
//     value: parameters ?? [],
//   });

//   let result = `export class ${applicationErrorName} extends Application.Error { constructor`;
//   result += parametersResult.output;
//   result += '{ super(';
//   result += messageResult.output;
//   result += ', ';
//   result += errorIdResult.output;
//   result += '); }}';
//   return {
//     output: result,
//     dependencies: [
//       ...parametersResult.dependencies,
//       ...messageResult.dependencies,
//       ...errorIdResult.dependencies,
//     ],
//   };
// };
const convertToString = (value: TRegularEvaluation): TString | TBackTickString => {
  const body = value.regularEvaluation;
  if (body.type === 'string') {
    return { string: body.value };
  }

  return { backTickString: body.value };
};

const applicationErrorToTargetLanguage = (
  variable: TApplicationError,
  applicationErrorName: string,
): TTargetDependenciesTypeScript => {
  /* 🔧 TODO: This won't work for now */
  const { message, errorId, parameters } = variable[ApplicationErrorKey];

  // TODO: throw error if message is not a string or backtick string
  const messageRegularEval = (message.expression as TEvaluation).evaluation as TRegularEvaluation;
  const messageText: TString | TBackTickString = convertToString(messageRegularEval);
  const messageResult = messageToTargetLanguage(messageText);
  const errorIdRegularEval = (errorId.expression as TEvaluation).evaluation as TRegularEvaluation;

  const errorIdText: TString = { string: errorIdRegularEval.regularEvaluation.value };
  // const erroIdText: TString = { string: errorIdRegularEval.regularEvaluation.value };
  const errorIdResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TString,
    value: errorIdText,
  });
  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters ?? [],
  });
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
  result += errorIdResult.output;
  result += '); }}';
  return {
    output: result,
    dependencies: [
      ...dependencies,
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
