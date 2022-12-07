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
  TExecute,
  TTargetDependenciesTypeScript,
  TDependenciesTypeScript,
  TDependencyChildTypescript,
  UseCaseKey,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { getParentDependencies } from '../../dependencies.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';

const useCaseToTargetLanguage = (useCases: TUseCase): TTargetDependenciesTypeScript => {
  const useCasesKeys = Object.keys(useCases);
  let result = '';
  let dependencies = [];
  for (let i = 0; i < useCasesKeys.length; i++) {
    const useCaseName = useCasesKeys[i];
    const useCaseValues = useCases[useCaseName];
    const useCaseValuesModel = useCaseValuesToTargetLanguage(useCaseValues, useCaseName);
    const useCaseValuesToTargetLanguageOutput = useCaseValuesModel.output;
    const useCaseValuesToTargetLanguageDependencies = useCaseValuesModel.dependencies;

    dependencies = [...dependencies, ...useCaseValuesToTargetLanguageDependencies];
    result += useCaseValuesToTargetLanguageOutput;
  }

  return { output: result, dependencies: [...dependencies] };
};

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

const useCaseValuesToTargetLanguage = (
  variable: TUseCase,
  useCaseName: string,
): TTargetDependenciesTypeScript => {
  let dependencies: TDependenciesTypeScript = [
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
      value: 'ok',
      from: '@bitloops/bl-boilerplate-core',
    },
  ];
  const { execute, parameters } = variable[UseCaseKey];
  const { returnType } = execute;
  const useCaseInputType = execute.parameters[0] ? execute.parameters[0].parameter.type : null;
  const useCaseResponseTypeName = `${useCaseName}Response`;

  const useCaseReturnTypesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnType,
  });
  dependencies = [...dependencies, ...useCaseReturnTypesResult.dependencies];

  const useCaseDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters,
  });
  dependencies = [...dependencies, ...useCaseDependenciesResult.dependencies];

  if (BitloopsPrimTypeIdentifiers.isArrayPrimType(useCaseInputType)) {
    throw new Error(
      `UseCase ${useCaseName} has an array as input type. This is not supported in Bitloops`,
    );
  }
  const { output: useCaseInputName, dependencies: useCaseTypeDependencies } = modelToTargetLanguage(
    {
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: useCaseInputType,
    },
  );

  let result = initialUseCase(
    useCaseReturnTypesResult.output,
    useCaseResponseTypeName,
    useCaseInputName,
    useCaseDependenciesResult.output,
    useCaseName,
  );

  // TODO fix dependencies (statements, and  execute.parameterDependencies[0], e.g input DTO)
  const executeResult = useCaseExecuteToTargetLanguage(
    variable[UseCaseKey].execute,
    useCaseResponseTypeName,
  );

  result += executeResult.output;
  result += '}';
  dependencies = [...dependencies, ...executeResult.dependencies, ...useCaseTypeDependencies];

  const parentDependencies = getParentDependencies(dependencies as TDependencyChildTypescript[], {
    classType: ClassTypes.UseCases,
    className: useCaseName,
  });

  return { output: result, dependencies: parentDependencies };
};

const useCaseExecuteToTargetLanguage = (
  variable: TExecute,
  responseTypeName: string,
): TTargetDependenciesTypeScript => {
  const { parameters, statements } = variable;
  const parameterDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameters,
  });

  const statementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const useCaseExecuteString = (parameterDependencies: string, statements: string): string => {
    let result = 'async execute';
    result += `${parameterDependencies}`;
    result += `: Promise<${responseTypeName}> {`;
    result += statements;
    result += '}';
    return result;
  };
  return {
    output: useCaseExecuteString(parameterDependenciesResult.output, statementsResult.output),
    dependencies: [...parameterDependenciesResult.dependencies, ...statementsResult.dependencies],
  };
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

export { useCaseToTargetLanguage };
