// import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
// import { TEntityValues } from '../../../../types.js';
// import BitloopsVisitor from '../BitloopsVisitor.js';

// export const customClassEvaluation = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.EntityDeclarationContext,
// ): { RootEntities: { [identifier: string]: TEntityValues } } => {
//   const valueObjectIdentifier = ctx.entityIdentifier().getText();
//   const body = thisVisitor.visit(ctx.entityBody());
//   const result = {
//     RootEntities: {
//       [valueObjectIdentifier]: body,
//     },
//   };
//   // console.log(JSON.stringify(result, null, 2));
//   return result;
// };
