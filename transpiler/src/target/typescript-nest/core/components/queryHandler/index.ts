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
  queryHandlerKey,
  TQueryHandler,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  TTargetDependenciesTypeScript,
  bitloopsPrimaryTypeKey,
  TParameter,
  TContextData,
} from '../../../../../types.js';
import { getTraceableDecorator } from '../../../helpers/tracingDecorator.js';
import { getParentDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { createHandlerConstructor } from '../handler-constructor/index.js';
import { executeToTargetLanguage } from '../use-case/execute.js';

const QUERY_HANDLER_DEPENDENCIES: () => TDependenciesTypeScript = () => [
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
];

const QUERY_HANDLER = 'queryHandler';

export const queryHandlerToTargetLanguage = (
  queryHandler: TQueryHandler,
  contextData: TContextData,
): TTargetDependenciesTypeScript => {
  const { execute, parameters, identifier: queryHandlerName } = queryHandler[queryHandlerKey];
  const { returnType } = execute;
  const queryHandlerInputType = execute.parameter ? execute.parameter.type : null;
  const queryHandlerResponseTypeName = `${queryHandlerName}Response`;

  let dependencies = QUERY_HANDLER_DEPENDENCIES();
  const queryHandlerReturnTypesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });

  const okType = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: { type: returnType.ok[bitloopsPrimaryTypeKey] },
  });

  dependencies = [...dependencies, ...queryHandlerReturnTypesResult.dependencies];

  let queryName = null;
  if (queryHandlerInputType) {
    const inputTypeOutput = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: queryHandlerInputType },
    });
    queryName = inputTypeOutput.output;
    dependencies = [...dependencies, ...inputTypeOutput.dependencies];
  }

  const queryHeaderAndConstructor = initialQueryHandler(
    queryHandlerReturnTypesResult.output,
    okType.output,
    queryHandlerResponseTypeName,
    queryName,
    queryHandlerName,
    parameters,
  );
  let result = queryHeaderAndConstructor.output;
  dependencies.push(...queryHeaderAndConstructor.dependencies);

  result += generateGetters({
    queryName,
    boundedContext: contextData.boundedContext,
  });

  result += getTraceableDecorator(queryHandlerName, QUERY_HANDLER);

  const executeResult = executeToTargetLanguage(
    queryHandler[queryHandlerKey].execute,
    queryHandlerResponseTypeName,
    true,
  );

  result += executeResult.output;
  result += '}';
  dependencies = [...dependencies, ...executeResult.dependencies];

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.QueryHandler,
    className: queryHandlerName,
  });

  return { output: result, dependencies: parentDependencies };
};

const initialQueryHandler = (
  returnTypesResult: string,
  okType: string,
  responseTypeName: string,
  inputType: string,
  queryHandlerName: string,
  parameters: TParameter[],
): TTargetDependenciesTypeScript => {
  const queryHandlerResponseType = `export type ${responseTypeName} = ${returnTypesResult};`;
  let result = queryHandlerResponseType;
  const responseType = okType;
  result += `export class ${queryHandlerName} implements Application.IQueryHandler<${
    inputType ? inputType : 'void'
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
  queryName,
  boundedContext,
}: {
  queryName: string;
  boundedContext: string;
}): string => {
  const result = `
  get query() {
    return ${queryName};
  }
  get boundedContext(): string {
    return '${boundedContext}';
  }`;
  return result;
};
