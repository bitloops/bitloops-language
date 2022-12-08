import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { RootEntityDeclarationNodeBuilder } from '../../intermediate-ast/builders/RootEntity/RootEntityDeclarationBuilder.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const aggregateDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.AggregateDeclarationContext,
): void => {
  const entityIdentifierNode = thisVisitor.visit(ctx.entityIdentifier());
  const entityValuesNode = thisVisitor.visit(ctx.entityBody());

  const metadata = produceMetadata(ctx, thisVisitor);
  new RootEntityDeclarationNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(entityIdentifierNode)
    .withValues(entityValuesNode)
    .build();
};
