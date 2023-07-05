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
  TContextData,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  TParameter,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { getTraceableDecorator } from '../../../helpers/tracingDecorator.js';
import { getParentDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { createHandlerConstructor } from '../handler-constructor/index.js';
import { executeToTargetLanguage } from '../execute.js';
import { getSystemEventsDecorator } from '../../../helpers/systemEventsDecorator.js';

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
    value: 'Traceable',
    from: '@bitloops/bl-boilerplate-infra-telemetry',
  },
  {
    type: 'absolute',
    default: false,
    value: 'SystemEvents',
    from: '@bitloops/bl-boilerplate-infra',
  },
];

const COMMAND_HANDLER = 'commandHandler';

export const commandHandlerToTargetLanguage = (
  commandHandler: TCommandHandler,
  contextData: TContextData,
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

  let commandName = null;
  if (commandHandlerInputType) {
    const inputTypeOutput = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: commandHandlerInputType },
    });
    commandName = inputTypeOutput.output;
    dependencies = [...dependencies, ...inputTypeOutput.dependencies];
  }

  const initialCommandHandlerResult = initialCommandHandler(
    commandHandlerReturnTypesResult.output,
    okType.output,
    commandHandlerResponseTypeName,
    commandName,
    commandHandlerName,
    parameters,
  );
  let result = initialCommandHandlerResult.output;
  dependencies.push(...initialCommandHandlerResult.dependencies);

  const getters = generateGetters({
    commandName,
    boundedContext: contextData.boundedContext,
  });
  result += getters;

  const traceableDecorator = getTraceableDecorator(commandHandlerName, COMMAND_HANDLER);
  const systemEventsDecorator = getSystemEventsDecorator();
  result += traceableDecorator;
  result += systemEventsDecorator;
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
  commandName: string,
  commandHandlerName: string,
  parameters: TParameter[],
): TTargetDependenciesTypeScript => {
  const commandHandlerResponseType = `export type ${responseTypeName} = ${commandHandlerResponse};`;
  let result = commandHandlerResponseType;
  const responseType = commandHandlerOkType;
  result += `export class ${commandHandlerName} implements Application.ICommandHandler<${
    commandName ? commandName : 'void'
  }, ${responseType}> {`;
  if (isDependenciesEmpty(parameters)) {
    return { output: result, dependencies: [] };
  }

  const constructor = createHandlerConstructor(parameters);
  result += constructor.output;
  // result += ` constructor${addPrivateToConstructorDependencies(dependencies)} {} `;
  return { output: result, dependencies: constructor.dependencies };
};

const isDependenciesEmpty = (parameters: TParameter[]): boolean => {
  return parameters.length === 0;
};

const generateGetters = ({
  commandName,
  boundedContext,
}: {
  commandName: string;
  boundedContext: string;
}): string => {
  const result = `
  get command() {
    return ${commandName};
  }
  get boundedContext(): string {
    return '${boundedContext}';
  }`;
  return result;
};
