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
import { controllerDefinitionIsRest } from '../../../../../../helpers/typeGuards.js';
import {
  TRESTController,
  TControllers,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
} from '../../../../../../types.js';
import { getParentDependencies } from '../../../dependencies.js';
import { ClassTypes } from '../../../../../../helpers/mappings.js';

// const useCaseToTargetLanguage = (useCases: TUseCase): TTargetDependenciesTypeScript => {
//   const useCasesKeys = Object.keys(useCases);
//   let result = '';
//   let dependencies: TDependenciesTypeScript = [
//     {
//       type: 'absolute',
//       default: false,
//       value: 'Application',
//       from: '@bitloops/bl-boilerplate-core',
//     },
//     {
//       type: 'absolute',
//       default: false,
//       value: 'Either',
//       from: '@bitloops/bl-boilerplate-core',
//     },
//     {
//       type: 'absolute',
//       default: false,
//       value: 'ok',
//       from: '@bitloops/bl-boilerplate-core',
//     },
//   ];
//   for (let i = 0; i < useCasesKeys.length; i++) {
//     const useCaseName = useCasesKeys[i];
//     const useCaseValues = useCases[useCaseName];
//     const useCaseValuesModel = useCaseValuesToTargetLanguage(useCaseValues, useCaseName);
//     const useCaseValuesToTargetLanguageOutput = useCaseValuesModel.output;
//     const useCaseValuesToTargetLanguageDependencies = useCaseValuesModel.dependencies;

//     dependencies = [...dependencies, ...useCaseValuesToTargetLanguageDependencies];
//     result += useCaseValuesToTargetLanguageOutput;
//   }

//   return { output: result, dependencies: [...dependencies] };
// };

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
  controllers: TRESTController,
  contextData: { boundedContext: string; module: string },
  controllersSetupData: TControllers,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const { boundedContext, module } = contextData;

  // TODO for all controllers
  const controllerName = Object.keys(controllers)[0];
  const controllerDefinition = controllersSetupData[boundedContext][module][controllerName];
  if (!controllerDefinitionIsRest(controllerDefinition)) {
    throw new Error('Controller declaration is not REST');
  }
  const { serverType } = controllerDefinition;
  const serverImports = getServerImports(serverType);
  dependencies = [...dependencies, ...serverImports];

  const extendsClass = getServerExtends(serverType);
  let result = `export class ${controllerName} extends ${extendsClass}{ `;
  const controller = controllers[controllerName];
  if (!controller.execute || !controller.parameterDependencies) {
    throw new Error('Controller must have execute and parameterDependencies');
  }

  const dependenciesRes = buildFieldsFromDependencies(
    controller.parameterDependencies,
    contextData,
  );
  result += dependenciesRes.output;
  dependencies = [...dependencies, ...dependenciesRes.dependencies];

  const { output, dependencies: executeDependencies } = buildExecuteMethod(controller.execute);
  result += output;

  const finalObjValLang = '}';
  result += finalObjValLang;

  dependencies = [...dependencies, ...executeDependencies];
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.Controllers,
    className: controllerName,
  });
  return { output: result, dependencies: parentDependencies };
};

export { restControllersToTargetLanguage };
