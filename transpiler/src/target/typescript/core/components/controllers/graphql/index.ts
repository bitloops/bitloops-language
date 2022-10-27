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
import { TGraphQLController, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';
import { buildExecuteMethod } from './buildGraphQLExecute.js';

const graphQLControllersToTargetLanguage = (
  controllers: TGraphQLController,
  contextData: { boundedContext: string; module: string },
): TTargetDependenciesTypeScript => {
  // TODO for all controllers
  const controllerName = Object.keys(controllers)[0];

  let result = `export class ${controllerName} extends GraphQL.BaseController<any,any> { `;
  const controller = controllers[controllerName];
  if (!controller.execute || !controller.parameterDependencies) {
    throw new Error('Controller must have execute and parameterDependencies');
  }

  result += buildFieldsFromDependencies(controller.parameterDependencies, contextData);

  const buildExecuteMethodOutput = buildExecuteMethod(controller.execute).output;
  const buildExecuteMethodDependencies = buildExecuteMethod(controller.execute).dependencies;
  result += buildExecuteMethodOutput;

  const finalObjValLang = '}';
  result += finalObjValLang;
  return { output: result, dependencies: [...buildExecuteMethodDependencies] };
};

export { graphQLControllersToTargetLanguage };
