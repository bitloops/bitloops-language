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

const controllerHeader = (controllerName: string, inputType: string, outputType: string): string =>
  `export class ${controllerName} extends GraphQL.BaseController<GraphQL.TRequest<${inputType}>,${outputType}> { `;

const graphQLControllersToTargetLanguage = (
  controllers: TGraphQLController,
  contextData: { boundedContext: string; module: string },
): TTargetDependenciesTypeScript => {
  let dependencies = getServerImports();
  const controllerName = controllers.GraphQLController.graphQLControllerIdentifier;

  const controllerInfo = controllers.GraphQLController;
  const { inputType, parameters, execute, controllerBusDependencies } = controllerInfo;
  const outputType = execute.returnType;
  const tsInputType = inputType !== null ? inputType : 'void';
  let result = controllerHeader(controllerName, tsInputType, outputType);

  const inputDependency = inputType ? getChildDependencies(inputType) : [];
  const outputDependency = getChildDependencies(outputType);
  dependencies = dependencies.concat(inputDependency, outputDependency);
  if (!execute || !parameters) {
    throw new Error('Controller must have execute and parameterDependencies');
  }
  const fieldsModel = buildFieldsFromDependencies({ parameters }, contextData, {
    controllerBusDependencies,
  });
  result += fieldsModel.output;

  const executeModel = buildExecuteMethod(execute);
  result += executeModel.output;

  result += '}';
  dependencies = [...dependencies, ...fieldsModel.dependencies, ...executeModel.dependencies];
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Controller,
    className: controllerName,
  });
  return { output: result, dependencies: parentDependencies };
};

export { graphQLControllersToTargetLanguage };
