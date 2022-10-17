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
import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import { TGraphQLController } from '../../../../types.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';
import { buildExecuteMethod } from './buildGraphQLExecute.js';

const graphQLControllersToTargetLanguage = (
  controllers: TGraphQLController,
  targetLanguage: string,
  contextData: { boundedContext: string; module: string },
): string => {
  const initialGraphQLControllerLangMapping = {
    [SupportedLanguages.TypeScript]: (controllerName: string) =>
      // TODO get framework info (fastify) from config?
      `export class ${controllerName} extends BaseGraphQLController<any,any> { `,
  };
  // TODO for all controllers
  const controllerName = Object.keys(controllers)[0];

  let result = initialGraphQLControllerLangMapping[targetLanguage](controllerName);
  const controller = controllers[controllerName];
  if (!controller.execute || !controller.parameterDependencies) {
    throw new Error('Controller must have execute and parameterDependencies');
  }

  result += buildFieldsFromDependencies(
    controller.parameterDependencies,
    targetLanguage,
    contextData,
  );

  result += buildExecuteMethod(controller.execute, targetLanguage);

  const finalObjValLangMapping: any = {
    [SupportedLanguages.TypeScript]: '}',
  };
  result += finalObjValLangMapping[targetLanguage];
  return result;
};

export { graphQLControllersToTargetLanguage };
