import { TLiteralExpression, TTargetDependenciesTypeScript } from '../../../../types.js';

export const literalSingleExpressionToTargetLanguage = (
  expression: TLiteralExpression,
): TTargetDependenciesTypeScript => {
  const { type, value: literalValue } = expression.literal;
  switch (type) {
    case 'string':
      return { output: `'${literalValue}'`, dependencies: [] };
    case 'number' as any:
      return { output: `${literalValue}`, dependencies: [] };
    case 'bool':
      return { output: `${literalValue}`, dependencies: [] };
    default:
      throw new Error(`Literal Type ${type} not supported`);
  }
};
