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
import { TControllers, TRESTController } from '../../../../types.js';
import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import { buildExecuteMethod } from './buildRestExecute.js';
import { controllerDefinitionIsRest } from '../../../../helpers/typeGuards.js';
import { buildFieldsFromDependencies } from '../helpers/buildFieldsFromDependencies.js';

const getServerImports = (serverType: string): string => {
  let result = '';
  switch (serverType) {
    case 'REST.Fastify':
      result += "import { FastifyRequest, FastifyReply } from 'fastify';\n";
      break;
    case 'REST.Express':
      throw new Error('Server type not supported');
    default:
      throw new Error('Server type not supported');
  }
  return result;
};

const restControllersToTargetLanguage = (
  controllers: TRESTController,
  targetLanguage: string,
  contextData: { boundedContext: string; module: string },
  controllersSetupData: TControllers,
): string => {
  // console.log('controllersSetupData', controllersSetupData);
  const { boundedContext, module } = contextData;

  const initialObjectValuesLangMapping = {
    [SupportedLanguages.TypeScript]: (controllerName: string, serverImports: string) =>
      // TODO get framework info (fastify) from config?
      `${serverImports}
export class ${controllerName} extends { `,
  };
  // TODO for all controllers
  const controllerName = Object.keys(controllers)[0];
  const controllerDefinition = controllersSetupData[boundedContext][module][controllerName];
  if (!controllerDefinitionIsRest(controllerDefinition)) {
    throw new Error('Controller declaration is not REST');
  }
  const { serverType } = controllerDefinition;
  const serverImports = getServerImports(serverType);

  let result = initialObjectValuesLangMapping[targetLanguage](controllerName, serverImports);
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

export { restControllersToTargetLanguage };
