import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { EntityValuesNodeBuilder } from '../../intermediate-ast/builders/Entity/EntityValuesBuilder.js';
import { EntityValuesNode } from '../../intermediate-ast/nodes/Entity/EntityValuesNode.js';
import { ConstDeclarationListNode } from '../../intermediate-ast/nodes/ConstDeclarationListNode.js';
import { ConstDeclarationListNodeBuilder } from '../../intermediate-ast/builders/ConstDeclarationListBuilder.js';
import { DomainCreateNode } from '../../intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { PublicMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PublicMethodDeclarationListNode.js';
import { PrivateMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNodeBuilder } from '../../intermediate-ast/builders/methods/PublicMethodDeclarationListNodeBuilder.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';

export const entityBodyVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EntityBodyContext,
): EntityValuesNode => {
  const domainCreateDeclarationNode: DomainCreateNode = thisVisitor.visit(
    ctx.domainCreateDeclaration(),
  );

  const constantVarNodes: ConstDeclarationListNode = ctx.domainConstDeclarationList()
    ? thisVisitor.visit(ctx.domainConstDeclarationList())
    : new ConstDeclarationListNodeBuilder().withConstants([]).build();

  const publicMethodNodes: PublicMethodDeclarationListNode = ctx.publicMethodDeclarationList()
    ? thisVisitor.visit(ctx.publicMethodDeclarationList())
    : new PublicMethodDeclarationListNodeBuilder().withMethods([]).build();

  const privateMethodNodes: PrivateMethodDeclarationListNode = ctx.privateMethodDeclarationList()
    ? thisVisitor.visit(ctx.privateMethodDeclarationList())
    : new PrivateMethodDeclarationListNodeBuilder().withMethods([]).build();

  const metadata = produceMetadata(ctx, thisVisitor);
  const entityValuesNode = new EntityValuesNodeBuilder(metadata)
    .withConstants(constantVarNodes)
    .withCreate(domainCreateDeclarationNode)
    .withPublicMethods(publicMethodNodes)
    .withPrivateMethods(privateMethodNodes)
    .build();
  return entityValuesNode;
};
