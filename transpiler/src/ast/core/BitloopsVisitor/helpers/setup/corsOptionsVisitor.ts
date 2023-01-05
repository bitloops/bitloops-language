import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { CorsOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/CorsOptionsNodeBuilder.js';
import { CorsOriginNodeBuilder } from '../../../intermediate-ast/builders/setup/CorsOriginNodeBuilder.js';
import { CorsOptionsListNode } from '../../../intermediate-ast/nodes/setup/CorsOptionsListNode.js';
import { CorsOptionsNode } from '../../../intermediate-ast/nodes/setup/CorsOptionsNode.js';
import { CorsOriginNode } from '../../../intermediate-ast/nodes/setup/CorsOriginNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { stringEvaluation } from '../index.js';

export const corsOptionsListStatementVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CorsOptionsListStatementContext,
): CorsOptionsNode => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const corsOptionsListNode: CorsOptionsListNode = thisVisitor.visit(ctx.corsOptionsList());

  const corsOriginNode: CorsOriginNode = corsOptionsListNode[0];

  const corsOptionsNode = new CorsOptionsNodeBuilder(metadata)
    .withCorsOrigin(corsOriginNode)
    .build();

  return corsOptionsNode;
};

// export const corsOptionsListVisitor = (
//   thisVisitor: BitloopsVisitor,
//     ctx: BitloopsParser.CorsOptionsListContext,
// ): CorsOptionsNode[] => {
//   //   const metadata = produceMetadata(ctx, thisVisitor);

//   const corsOptions = thisVisitor.visitChildren();
//   const corsOptionNodes: CorsOptionsNode[] = corsOptions.filter(
//     (corsOption) => corsOption !== undefined,
//   );

//   return corsOptionNodes;
// };

export const corsOptionsOriginVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CorsOriginOptionContext,
): CorsOriginNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const corsOrigin = stringEvaluation(ctx.StringLiteral().getText());
  const corsOptionOriginNode = new CorsOriginNodeBuilder(metadata).withOrigin(corsOrigin).build();

  return corsOptionOriginNode;
};
