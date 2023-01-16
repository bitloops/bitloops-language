import { TTargetDependenciesTypeScript, TThisExpression } from '../../../../../../types.js';

export const thisExpressionToTargetLanguage = (
  variable: TThisExpression,
): TTargetDependenciesTypeScript => {
  const { thisExpression } = variable;

  return {
    output: thisExpression,
    dependencies: [],
  };
};
