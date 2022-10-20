import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TLogicalSingleExpression, TTargetDependenciesTypeScript } from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { isLogicalORExpression } from './type-guards/index.js';

export const logicalSingleExpressionToTargetLanguage = (
  expression: TLogicalSingleExpression,
): TTargetDependenciesTypeScript => {
  const dependencies = [];
  if (isLogicalORExpression(expression.logicalExpression)) {
    const left = modelToTargetLanguage({
      type: BitloopsTypesMapping.TSingleExpression,
      value: expression.logicalExpression.orExpression.left,
    });
    const right = modelToTargetLanguage({
      type: BitloopsTypesMapping.TSingleExpression,
      value: expression.logicalExpression.orExpression.right,
    });
    return {
      output: `${left.output} || ${right.output}`,
      dependencies: [...dependencies, ...left.dependencies, ...right.dependencies],
    };
  }
  throw new Error('Type of Logical Expression not supported');
};
