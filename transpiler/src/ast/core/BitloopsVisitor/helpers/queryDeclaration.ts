import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { QueryNodeBuilder } from '../../intermediate-ast/builders/query/QueryNodeBuilder.js';
import { FieldListNode } from '../../intermediate-ast/nodes/FieldList/FieldListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const queryDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.QueryDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const queryIdentifierNode = thisVisitor.visit(ctx.queryIdentifier());
  const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

  new QueryNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(queryIdentifierNode)
    .withFieldList(fieldListNode)
    .build();
};
