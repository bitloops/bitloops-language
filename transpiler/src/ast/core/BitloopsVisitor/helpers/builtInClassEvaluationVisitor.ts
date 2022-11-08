import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { TBuiltInClassEvaluation } from '../../../../types.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const builtInClassEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BuiltInClassEvaluationContext,
): TBuiltInClassEvaluation => {
  const className = ctx.bitloopsBuiltInClass().getText();
  const argumentDependencies = thisVisitor.visit(ctx.methodArguments());
  const result = {
    builtInClass: {
      className,
      argumentDependencies,
    },
  };
  return result;
};
