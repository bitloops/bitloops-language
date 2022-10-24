import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { TEntityValues } from '../../../../types.js';

export const aggregateDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EntityDeclarationContext,
): { Aggregates: { [identifier: string]: TEntityValues } } => {
  const valueObjectIdentifier = ctx.entityIdentifier().getText();
  const body = thisVisitor.visit(ctx.entityBody());
  const result = {
    Aggregates: {
      [valueObjectIdentifier]: body,
    },
  };
  // console.log(JSON.stringify(result, null, 2));
  return result;
};
