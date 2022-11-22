import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';

export const arrayLiteralExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ArrayLiteralExpressionContext,
) => {
  const arrayLiteral = thisVisitor.visit(ctx.arrayLiteral());
  return {
    expression: {
      ...arrayLiteral,
    },
  };
};
