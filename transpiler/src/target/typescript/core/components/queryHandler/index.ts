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
  TContextData,
} from '../../../../../types.js';
import { getTraceableDecorator } from '../../../helpers/tracingDecorator.js';
import { getParentDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
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
  const { boundedContext } = contextData;
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

  const { output: queryDependenciesOutput, dependencies: queryHandlerDependenciesResult } =
    modelToTargetLanguage({
      type: BitloopsTypesMapping.TParameterList,
      value: { parameters },
    });
  dependencies = [...dependencies, ...queryHandlerDependenciesResult];

  let queryName = null;
  if (queryHandlerInputType) {
    const inputTypeOutput = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: queryHandlerInputType },
    });
    queryName = inputTypeOutput.output;
    dependencies = [...dependencies, ...inputTypeOutput.dependencies];
  }

  let result = initialQueryHandler(
    queryHandlerReturnTypesResult.output,
    okType.output,
    queryHandlerResponseTypeName,
    queryName,
    queryDependenciesOutput,
    queryHandlerName,
  );

  result += generateGetters({
    queryName,
    boundedContextName: boundedContext,
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
  dependencies: string,
  queryHandlerName: string,
): string => {
  const queryHandlerResponseType = `export type ${responseTypeName} = ${returnTypesResult};`;
  let result = queryHandlerResponseType;
  const responseType = okType;
  result += `export class ${queryHandlerName} implements Application.IQueryHandler<${
    inputType ? inputType : 'void'
  }, ${responseType}> {`;
  if (!isDependenciesEmpty(dependencies))
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

const generateGetters = ({
  queryName,
  boundedContextName,
}: {
  queryName: string;
  boundedContextName: string;
}): string => {
  const result = `
  get query() {
    return ${queryName};
  }
  get boundedContext(): string {
    return '${boundedContextName}';
  }`;
  return result;
};
