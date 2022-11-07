import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { TCustomClassEvaluation } from '../../../../types.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const customClassEvaluationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CustomClassEvaluationContext,
): TCustomClassEvaluation => {
  const className = ctx.customClassIdentifier();
  const argumentDependencies = thisVisitor.visit(ctx.evaluationFieldList());
  const result = {
    customClass: {
      className,
      argumentDependencies,
    },
  };
  return result;
};
