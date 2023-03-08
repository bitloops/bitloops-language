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

import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import {
  bitloopsPrimaryTypeKey,
  domainServiceKey,
  TDependenciesTypeScript,
  TDomainService,
  TParameter,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getParentDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { domainMethods } from '../domain/domainMethods.js';

const DOMAIN_SERVICE_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Either',
    from: '@bitloops/bl-boilerplate-core',
  },
];

export const domainServiceToTargetLanguage = (
  domainServiceModel: TDomainService,
): TTargetDependenciesTypeScript => {
  const domainService = domainServiceModel[domainServiceKey];

  let result = '';
  let dependencies = DOMAIN_SERVICE_DEPENDENCIES;

  const {
    identifier: domainServiceName,
    publicMethods,
    privateMethods,
    parameters: constructorParameters,
  } = domainService;

  const entityMethodsModel = domainMethods(publicMethods, privateMethods);
  dependencies = [...dependencies, ...entityMethodsModel.dependencies];

  result += `export class ${domainServiceName} { `;
  result += generateConstructor(constructorParameters);
  result += entityMethodsModel.output;
  result += '}';

  const finalDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.DomainService,
    className: domainServiceName,
  });

  return { output: result, dependencies: finalDependencies };
};

const generateConstructor = (constructorParameters: TParameter[]): string => {
  let constructorParametersString = '';
  for (const constructorParameter of constructorParameters) {
    const parameter = constructorParameter.parameter;
    const parameterName = parameter.value;
    const parameterTypeRes = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: parameter[bitloopsPrimaryTypeKey] },
    });
    const parameterType = parameterTypeRes.output;

    constructorParametersString += `private ${parameterName}: ${parameterType}, `;
  }

  return `constructor(${constructorParametersString}) {}`;
};
