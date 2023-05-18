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
import { ClassTypes } from '../../../../../../helpers/mappings.js';
import {
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  DomainErrorKey,
  DomainErrorIdentifier,
  TDomainErrorValue,
  TDomainError,
  TDependencyChildTypescript,
} from '../../../../../../types.js';
import { getParentDependencies } from '../../../dependencies.js';
import { getErrorValues } from '../index.js';

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

const domainErrorToTargetLanguage = (
  variable: TDomainErrorValue,
  domainErrorName: string,
): TTargetDependenciesTypeScript => {
  const { messageResult, errorIdText, parametersResult } = getErrorValues(variable);

  const dependencies: TDependenciesTypeScript = [
    {
      type: 'absolute',
      default: false,
      value: 'Domain',
      from: '@bitloops/bl-boilerplate-core',
    },
  ];

  let result = `export class ${domainErrorName} extends Domain.Error {
    static readonly errorId = ${errorIdText.output};
     constructor`;
  result += parametersResult.output;
  result += '{ super(';
  result += messageResult.output;
  result += ', ';
  result += `${domainErrorName}.errorId`;
  result += '); }}';

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.DomainError,
    className: domainErrorName,
  });

  return {
    output: result,
    dependencies: [
      ...parentDependencies,
      ...parametersResult.dependencies,
      ...messageResult.dependencies,
      ...errorIdText.dependencies,
    ],
  };
};

export { domainErrorsToTargetLanguage };
