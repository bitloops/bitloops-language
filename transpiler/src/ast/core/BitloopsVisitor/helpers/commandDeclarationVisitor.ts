import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { CommandNodeBuilder } from '../../intermediate-ast/builders/command/CommandNodeBuilder.js';
import { FieldListNode } from '../../intermediate-ast/nodes/FieldList/FieldListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

export const commandDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CommandDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const commandIdentifierNode = thisVisitor.visit(ctx.commandIdentifier());
  const fieldListNode: FieldListNode = thisVisitor.visit(ctx.fieldList());

  new CommandNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(commandIdentifierNode)
    .withFieldList(fieldListNode)
    .build();
};
