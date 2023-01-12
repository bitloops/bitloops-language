import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TExecute, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const useCaseExecuteToTargetLanguage = (
  variable: TExecute,
  responseTypeName: string,
): TTargetDependenciesTypeScript => {
  const { parameter, statements } = variable;

  let parameterList = { parameters: [] };
  if (parameter) parameterList = { parameters: [{ parameter }] };
  const parameterDependenciesResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: parameterList,
  });

  const statementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  return {
    output: useCaseExecuteString(
      parameterDependenciesResult.output,
      statementsResult.output,
      responseTypeName,
    ),
    dependencies: [...parameterDependenciesResult.dependencies, ...statementsResult.dependencies],
  };
};

const useCaseExecuteString = (
  parameterOutput: string,
  statements: string,
  responseTypeName: string,
): string => {
  let result = 'async execute';
  result += `${parameterOutput}`;
  result += `: Promise<${responseTypeName}> {`;
  result += statements;
  result += '}';
  return result;
};
