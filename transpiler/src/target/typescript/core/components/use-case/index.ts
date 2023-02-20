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
  TUseCase,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  UseCaseKey,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';
import { executeToTargetLanguage } from './execute.js';

const USE_CASE_DEPENDENCIES: TDependenciesTypeScript = [
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
  // {
  //   type: 'absolute',
  //   default: false,
  //   value: 'ok',
  //   from: '@bitloops/bl-boilerplate-core',
  // },
];

const initialUseCase = (
  returnTypesResult: string,
  responseTypeName: string,
  inputType: string,
  dependencies: string,
  useCaseName: string,
): string => {
  const useCaseResponseType = `type ${responseTypeName} = ${returnTypesResult};`;
  let result = useCaseResponseType;
  const responseType = `Promise<${responseTypeName}>`;
  result += `export class ${useCaseName} implements Application.IUseCase<${
    inputType ? inputType : 'void'
  }, ${responseType}> {`;
  if (!isDependenciesEmpty(dependencies))
    result += ` constructor${addPrivateToConstructorDependencies(dependencies)} {}; `;
  return result;
};

export const useCaseToTargetLanguage = (useCase: TUseCase): TTargetDependenciesTypeScript => {
  const { execute, parameters, UseCaseIdentifier: useCaseName } = useCase[UseCaseKey];
  const { returnType } = execute;
  const useCaseInputType = execute.parameter ? execute.parameter.type : null;
  const useCaseResponseTypeName = `${useCaseName}Response`;

  let dependencies = USE_CASE_DEPENDENCIES;
  const useCaseReturnTypesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: { returnType },
  });
  dependencies = [...dependencies, ...useCaseReturnTypesResult.dependencies];

  const useCaseDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters },
  });
  dependencies = [...dependencies, ...useCaseDependenciesResult.dependencies];

  let useCaseInputName = null;
  if (useCaseInputType) {
    const inputTypeOutput = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: { type: useCaseInputType },
    });
    useCaseInputName = inputTypeOutput.output;
    dependencies = [...dependencies, ...inputTypeOutput.dependencies];
  }

  let result = initialUseCase(
    useCaseReturnTypesResult.output,
    useCaseResponseTypeName,
    useCaseInputName,
    useCaseDependenciesResult.output,
    useCaseName,
  );

  const executeResult = executeToTargetLanguage(
    useCase[UseCaseKey].execute,
    useCaseResponseTypeName,
  );

  result += executeResult.output;
  result += '}';
  dependencies = [...dependencies, ...executeResult.dependencies];

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.UseCase,
    className: useCaseName,
  });

  return { output: result, dependencies: parentDependencies };
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
