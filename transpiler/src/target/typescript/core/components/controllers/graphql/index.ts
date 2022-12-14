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
  TDependenciesTypeScript,
  TGraphQLController,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';
import { buildExecuteMethod } from './buildGraphQLExecute.js';
import { getChildDependencies, getParentDependencies } from './../../../dependencies.js';
import { ClassTypes } from '../../../../../../helpers/mappings.js';

const getServerImports = (): TDependenciesTypeScript => {
  const dependencies: TDependenciesTypeScript = [
    {
      type: 'absolute',
      default: false,
      value: 'GraphQL',
      from: '@bitloops/bl-boilerplate-infra-graphql',
    },
  ];
  return dependencies;
};

const graphQLControllersToTargetLanguage = (
  controllers: TGraphQLController,
  contextData: { boundedContext: string; module: string },
): TTargetDependenciesTypeScript => {
  // TODO for all controllers
  let dependencies = getServerImports();
  const controllerName = Object.keys(controllers)[0];

  const controller = controllers[controllerName];
  const { inputType, outputType } = controller;
  const tsInputType = inputType !== null ? inputType : 'void';
  let result = `export class ${controllerName} extends GraphQL.BaseController<GraphQL.TRequest<${tsInputType}>,${outputType}> { `;

  const inputDependency = inputType ? getChildDependencies(inputType) : [];
  const outputDependency = getChildDependencies(outputType);
  dependencies = dependencies.concat(inputDependency, outputDependency);
  if (!controller.execute || !controller.parameterDependencies) {
    throw new Error('Controller must have execute and parameterDependencies');
  }
  const fieldsModel = buildFieldsFromDependencies(controller.parameterDependencies, contextData);
  result += fieldsModel.output;

  const executeModel = buildExecuteMethod(controller.execute);
  result += executeModel.output;

  const finalObjValLang = '}';
  result += finalObjValLang;
  dependencies = [...dependencies, ...fieldsModel.dependencies, ...executeModel.dependencies];
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Controllers,
    className: controllerName,
  });
  return { output: result, dependencies: parentDependencies };
};

export { graphQLControllersToTargetLanguage };
