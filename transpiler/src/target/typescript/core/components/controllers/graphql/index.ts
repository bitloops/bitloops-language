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

import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import { TGraphQLController, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';
import { buildExecuteMethod } from './buildGraphQLExecute.js';

const graphQLControllersToTargetLanguage = (
  controllers: TGraphQLController,
  targetLanguage: string,
  contextData: { boundedContext: string; module: string },
): TTargetDependenciesTypeScript => {
  // TODO for all controllers
  const controllerName = Object.keys(controllers)[0];

  let result = `export class ${controllerName} extends BaseGraphQLController<any,any> { `;
  const controller = controllers[controllerName];
  if (!controller.execute || !controller.parameterDependencies) {
    throw new Error('Controller must have execute and parameterDependencies');
  }

  result += buildFieldsFromDependencies(
    controller.parameterDependencies,
    targetLanguage,
    contextData,
  );

  const buildExecuteMethodOutput = buildExecuteMethod(controller.execute, targetLanguage).output;
  const buildExecuteMethodDependencies = buildExecuteMethod(
    controller.execute,
    targetLanguage,
  ).dependencies;
  result += buildExecuteMethodOutput;

  const finalObjValLangMapping: any = {
    [SupportedLanguages.TypeScript]: '}',
  };
  result += finalObjValLangMapping[targetLanguage];
  return { output: result, dependencies: [...buildExecuteMethodDependencies] };
};

export { graphQLControllersToTargetLanguage };
