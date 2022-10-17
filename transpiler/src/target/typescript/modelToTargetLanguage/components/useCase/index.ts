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
import { TUseCase, TUseCaseValues, TExecute } from '../../../types.js';
import { SupportedLanguages } from '../../../helpers/supportedLanguages.js';
import { BitloopsTypesMapping } from '../commons/index.js';
import { modelToTargetLanguage } from '../index.js';

const useCaseToTargetLanguage = (useCases: TUseCase, targetLanguage: string): string => {
  const useCasesKeys = Object.keys(useCases);
  let result = '';
  for (let i = 0; i < useCasesKeys.length; i++) {
    const useCaseName = useCasesKeys[i];
    const useCaseValues = useCases[useCaseName];
    result += useCaseValuesToTargetLanguage(useCaseValues, useCaseName, targetLanguage);
  }

  return result;
};

const useCaseValuesToTargetLanguage = (
  variable: TUseCaseValues,
  useCaseName: string,
  targetLanguage: string,
): string => {
  const { execute, returnTypes, parameterDependencies } = variable;
  const useCaseInputType = execute.parameterDependencies[0]
    ? execute.parameterDependencies[0].type
    : null;
  const useCaseResponseTypeName = `${useCaseName}Response`;

  const initialUseCaseLangMapping: any = {
    [SupportedLanguages.TypeScript]: (
      returnTypesResult: string,
      responseTypeName: string,
      inputType: string,
      dependencies: string,
    ): string => {
      let result = `type ${responseTypeName} = ${returnTypesResult};`;
      const responseType = `Promise<${responseTypeName}>`;
      result += `export class ${useCaseName} implements UseCase<${
        inputType ? inputType : 'Void'
      }, ${responseType}> {`;
      if (!isDependenciesEmpty(dependencies))
        result += ` constructor${addPrivateToConstructorDependencies(dependencies)} {}; `;
      return result;
    },
  };
  const finalUseCaseLangMapping: any = {
    [SupportedLanguages.TypeScript]: (): string => {
      return '}';
    },
  };

  const useCaseReturnTypesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TOkErrorReturnType,
    value: returnTypes,
    targetLanguage,
  });

  const useCaseDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameterDependencies,
    targetLanguage,
  });

  let result = initialUseCaseLangMapping[targetLanguage](
    useCaseReturnTypesResult,
    useCaseResponseTypeName,
    useCaseInputType,
    useCaseDependenciesResult,
  );

  const executeResult = useCaseExecuteToTargetLanguage(
    variable.execute,
    useCaseResponseTypeName,
    targetLanguage,
  );
  result += executeResult;
  result += finalUseCaseLangMapping[targetLanguage]();

  return result;
};

const useCaseExecuteToTargetLanguage = (
  variable: TExecute,
  responseTypeName: string,
  targetLanguage: string,
): string => {
  const { parameterDependencies, statements } = variable;
  const parameterDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterDependencies,
    value: parameterDependencies,
    targetLanguage,
  });

  const statementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
    targetLanguage,
  });

  const useCaseExecuteLangMapping: any = {
    [SupportedLanguages.TypeScript]: (parameterDependencies: string, statements: string) => {
      let result = 'async execute';
      result += `${parameterDependencies}`;
      result += `: Promise<${responseTypeName}> {`;
      result += statements;
      result += '}';
      return result;
    },
  };
  return useCaseExecuteLangMapping[targetLanguage](parameterDependenciesResult, statementsResult);
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
