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
  commandHandlerKey,
  TCommandHandler,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  TParameter,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getParentDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { createHandlerConstructor } from '../handler-constructor/index.js';
import { executeToTargetLanguage } from '../use-case/execute.js';

const COMMAND_HANDLER_DEPENDENCIES: () => TDependenciesTypeScript = () => [
  {
    type: 'absolute',
    default: false,
    value: 'Application',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'Either',
    from: '@bitloops/bl-boilerplate-core',
  },
  {
    type: 'absolute',
    default: false,
    value: 'RespondWithPublish',
    from: '@bitloops/bl-boilerplate-core',
  },
];

export const commandHandlerToTargetLanguage = (
  commandHandler: TCommandHandler,
): TTargetDependenciesTypeScript => {
  const { execute, parameters, identifier: commandHandlerName } = commandHandler[commandHandlerKey];
  const { returnType } = execute;
  const commandHandlerInputType = execute.parameter ? execute.parameter.type : null;
  const commandHandlerResponseTypeName = `${commandHandlerName}Response`;

  let dependencies = COMMAND_HANDLER_DEPENDENCIES();
  const commandHandlerReturnTypesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });

  const okType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: returnType.ok[bitloopsPrimaryTypeKey] },
  });
  dependencies = [...dependencies, ...commandHandlerReturnTypesResult.dependencies];

  const { output: commandName, dependencies: commandHandlerDependenciesResult } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterList,
      value: { parameters },
    });
  dependencies = [...dependencies, ...commandHandlerDependenciesResult];

  let commandHandlerInputName = null;
  if (commandHandlerInputType) {
    const inputTypeOutput = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: commandHandlerInputType },
    });
    commandHandlerInputName = inputTypeOutput.output;
    dependencies = [...dependencies, ...inputTypeOutput.dependencies];
  }

  let result = initialCommandHandler(
    commandHandlerReturnTypesResult.output,
    okType.output,
    commandHandlerResponseTypeName,
    commandHandlerInputName,
    commandName,
    commandHandlerName,
    parameters,
  );

  const executeResult = executeToTargetLanguage(
    commandHandler[commandHandlerKey].execute,
    commandHandlerResponseTypeName,
    true,
  );

  result += executeResult.output;
  result += '}';
  dependencies = [...dependencies, ...executeResult.dependencies];

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.CommandHandler,
    className: commandHandlerName,
  });

  return { output: result, dependencies: parentDependencies };
};

const initialCommandHandler = (
  commandHandlerResponse: string,
  commandHandlerOkType: string,
  responseTypeName: string,
  inputType: string,
  dependencies: string,
  commandHandlerName: string,
  parameters: TParameter[],
): string => {
  const commandHandlerResponseType = `export type ${responseTypeName} = ${commandHandlerResponse};`;
  let result = commandHandlerResponseType;
  const responseType = commandHandlerOkType;
  result += `export class ${commandHandlerName} implements Application.ICommandHandler<${
    inputType ? inputType : 'void'
  }, ${responseType}> {`;
  if (isDependenciesEmpty(dependencies)) {
    return result;
  }

  result += createHandlerConstructor(parameters);
  result += ` constructor${addPrivateToConstructorDependencies(dependencies)} {} `;
  return result;
};

const isDependenciesEmpty = (dependencies: string): boolean => {
  const strippedDependencies = dependencies.replace(/\s/g, '');
  if (strippedDependencies === '()') return true;
  return false;
};

const addPrivateToConstructorDependencies = (dependencies: string): string => {
  const strippedDependencies = dependencies.replace(/\s/g, '');
  if (strippedDependencies === '()') return dependencies;
  const strippedDependenciesWithoutParenthesis = strippedDependencies.replace(/\(|\)/g, '');
  const dependenciesArray = strippedDependenciesWithoutParenthesis.split(',');
  const result = dependenciesArray.map((dependency) => {
    const dependencyArray = dependency.split(':');
    const dependencyName = dependencyArray[0];
    const dependencyType = dependencyArray[1];
    return `private ${dependencyName}: ${dependencyType}`;
  });
  return `(${result.join(',')})`;
};
