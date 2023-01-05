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
import { buildExecuteMethod } from './buildRestExecute.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';
import {
  TRESTController,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
} from '../../../../../../types.js';
import { getParentDependencies } from '../../../dependencies.js';
import { ClassTypes } from '../../../../../../helpers/mappings.js';

const getServerImports = (serverType: string): TDependenciesTypeScript => {
  switch (serverType) {
    case 'REST.Fastify': {
      // result += "import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';\n";
      const dependencies: TDependenciesTypeScript = [
        {
          type: 'absolute',
          default: false,
          value: 'Fastify',
          from: '@bitloops/bl-boilerplate-infra-rest-fastify',
        },
      ];
      return dependencies;
    }
    case 'REST.Express':
      throw new Error('Server type not supported');
    default:
      throw new Error('Server type not supported');
  }
};

const getServerExtends = (serverType: string): string => {
  let result = '';
  switch (serverType) {
    case 'REST.Fastify':
      result += 'Fastify.BaseController';
      break;
    case 'REST.Express':
      throw new Error('Server type not supported');
    default:
      throw new Error('Server type not supported');
  }
  return result;
};

const restControllersToTargetLanguage = (
  controller: TRESTController,
  contextData: { boundedContext: string; module: string },
  controllersSetupData: any,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const controllerInfo = controller.RESTController;
  const { boundedContext, module } = contextData;

  const controllerName = controller.RESTController.RESTControllerIdentifier;
  const controllerDefinition = controllersSetupData[boundedContext][module][controllerName];
  // if (!controllerDefinitionIsRest(controllerDefinition)) {
  //   throw new Error('Controller declaration is not REST');
  // }

  const { serverType } = controllerDefinition;
  dependencies.push(...getServerImports(serverType));

  const extendsClass = getServerExtends(serverType);
  let result = `export class ${controllerName} extends ${extendsClass}{ `;
  if (!controllerInfo.execute || !controllerInfo.parameters) {
    throw new Error('Controller must have execute and parameterDependencies');
  }

  const { parameters } = controllerInfo;
  const dependenciesRes = buildFieldsFromDependencies({ parameters }, contextData);
  result += dependenciesRes.output;
  dependencies = [...dependencies, ...dependenciesRes.dependencies];

  const { output, dependencies: executeDependencies } = buildExecuteMethod(controllerInfo.execute);
  result += output;

  const finalObjValLang = '}';
  result += finalObjValLang;

  dependencies.push(...executeDependencies);
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Controller,
    className: controllerName,
  });
  return { output: result, dependencies: parentDependencies };
};

export { restControllersToTargetLanguage };
