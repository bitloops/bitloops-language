import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TExecute, TTargetDependenciesTypeScript } from '../../../../types.js';
import { modelToTargetLanguage } from '../modelToTargetLanguage.js';

export const executeToTargetLanguage = (
  variable: TExecute,
  responseTypeName: string,
  isCommandQuery?: boolean,
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

  let output;
  if (isCommandQuery) {
    output = ExecuteWithRespondPublishString(
      parameterDependenciesResult.output,
      statementsResult.output,
      responseTypeName,
    );
  } else {
    output = useCaseExecuteString(
      parameterDependenciesResult.output,
      statementsResult.output,
      responseTypeName,
    );
  }
  return {
    output,
    dependencies: [...parameterDependenciesResult.dependencies, ...statementsResult.dependencies],
  };
};

const useCaseExecuteString = (
  parameterOutput: string,
  statements: string,
  responseTypeName: string,
): string => {
  let result = `@SystemEvents()
  async execute`;
  result += `${parameterOutput}`;
  result += `: Promise<${responseTypeName}> {`;
  result += statements;
  result += '}';
  return result;
};

const ExecuteWithRespondPublishString = (
  parameterOutput: string,
  statements: string,
  responseTypeName: string,
): string => {
  let result = '\nasync execute';
  result += `${parameterOutput}`;
  result += `: Promise<${responseTypeName}> {`;
  result += statements;
  result += '}';
  return result;
};
