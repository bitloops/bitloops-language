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
 *  MERCHANTABILITY or FITNESS FturnOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import {
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  DomainErrorKey,
  DomainErrorIdentifier,
  TDomainErrorValue,
  TDomainError,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const domainErrorsToTargetLanguage = (domainError: TDomainError): TTargetDependenciesTypeScript => {
  let result = '';
  let dependencies = [];
  const domainErrorName = domainError[DomainErrorKey][DomainErrorIdentifier];
  const domainErrorValue = domainError[DomainErrorKey];
  const domainErrorToTargetLang = domainErrorToTargetLanguage(domainErrorValue, domainErrorName);
  result += domainErrorToTargetLang.output;
  dependencies = [...dependencies, ...domainErrorToTargetLang.dependencies];
  return { output: result, dependencies };
};

// const getErrorValues = (
//   error: TDomainErrorValue | TApplicationErrorValue,
// ): {
//   messageResult: TTargetDependenciesTypeScript;
//   errorIdText: TTargetDependenciesTypeScript;
//   parametersResult: TTargetDependenciesTypeScript;
// } => {
//   const domainErrorValue = error as TDomainErrorValue;
//   const applicationErrorValue = error as TDomainErrorValue;

//   let message: TExpression;
//   let errorId: TExpression;
//   let parameters: TParameter[];

//   if (domainErrorValue) {
//     message = domainErrorValue.message;
//     errorId = domainErrorValue.errorId;
//     parameters = domainErrorValue.parameters;
//   } else if (applicationErrorValue) {
//     message = applicationErrorValue.message;
//     errorId = applicationErrorValue.errorId;
//     parameters = applicationErrorValue.parameters;
//   }

//   const messageExpression = message.expression;
//   const messageResult = modelToTargetLanguage({
//     type: BitloopsTypesMapping.TExpressionValues,
//     value: messageExpression,
//   });
//   const errorIdRegularEval = errorId.expression;

//   const errorIdText = modelToTargetLanguage({
//     type: BitloopsTypesMapping.TExpressionValues,
//     value: errorIdRegularEval,
//   });

//   const parametersResult = modelToTargetLanguage({
//     type: BitloopsTypesMapping.TParameterList,
//     value: { parameters } ?? [],
//   });

//   return {
//     messageResult,
//     errorIdText,
//     parametersResult,
//   };
// };

const domainErrorToTargetLanguage = (
  variable: TDomainErrorValue,
  domainErrorName: string,
): TTargetDependenciesTypeScript => {
  const { message, errorId, parameters } = variable;

  const messageExpression = message.expression;
  const messageResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: messageExpression,
  });
  const errorIdRegularEval = errorId.expression;

  const errorIdText = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: errorIdRegularEval,
  });

  const parametersResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters } ?? [],
  });
  const dependencies: TDependenciesTypeScript = [
    {
      type: 'absolute',
      default: false,
      value: 'Domain',
      from: '@bitloops/bl-boilerplate-core',
    },
  ];

  let result = `export class ${domainErrorName} extends Domain.Error { constructor`;
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

export { domainErrorsToTargetLanguage };
