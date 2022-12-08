import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { RootEntityDeclarationNodeBuilder } from '../../intermediate-ast/builders/RootEntity/RootEntityDeclarationBuilder.js';
import { RootEntityIdentifierNodeBuilder } from '../../intermediate-ast/builders/RootEntity/RootEntityIdentifierBuilder.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const aggregateDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.AggregateDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const valueObjectIdentifier = ctx.entityIdentifier().getText();
  const entityIdentifierNode = new RootEntityIdentifierNodeBuilder(metadata)
    .withName(valueObjectIdentifier)
    .build();

  const entityValuesNode = thisVisitor.visit(ctx.entityBody());

  new RootEntityDeclarationNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(entityIdentifierNode)
    .withValues(entityValuesNode)
    .build();
};
