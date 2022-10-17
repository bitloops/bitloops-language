import { TLiteralExpression } from '../../../../types.js';

export const literalSingleExpressionToTargetLanguage = (
  expression: TLiteralExpression,
  _language: string,
): string => {
  const { type, value: literalValue } = expression.literal;
  switch (type) {
    case 'string':
      return `'${literalValue}'`;
    case 'number' as any:
      return `${literalValue}`;
    case 'bool':
      return `${literalValue}`;
    default:
      throw new Error(`Literal Type ${type} not supported`);
  }
};
