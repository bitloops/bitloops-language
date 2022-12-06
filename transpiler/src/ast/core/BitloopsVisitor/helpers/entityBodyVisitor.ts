import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { EntityValuesNodeBuilder } from '../../intermediate-ast/builders/Entity/EntityValuesBuilder.js';
import { EntityValuesNode } from '../../intermediate-ast/nodes/Entity/EntityValuesNode.js';
import { ConstDeclarationListNode } from '../../intermediate-ast/nodes/ConstDeclarationListNode.js';
import { ConstDeclarationListNodeBuilder } from '../../intermediate-ast/builders/ConstDeclarationListBuilder.js';
import { DomainCreateNode } from '../../intermediate-ast/nodes/Domain/DomainCreateNode.js';
import { PublicMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PublicMethodDeclarationListNode.js';

export const entityBodyVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EntityBodyContext,
): EntityValuesNode => {
  const domainConstructorDeclarationNode: DomainCreateNode = thisVisitor.visit(
    ctx.domainConstructorDeclaration(),
  );

  const constantVarNodes: ConstDeclarationListNode = ctx.domainConstDeclarationList()
    ? thisVisitor.visit(ctx.domainConstDeclarationList())
    : new ConstDeclarationListNodeBuilder().withConstants([]).build();

  const publicMethodNodes: PublicMethodDeclarationListNode = thisVisitor.visit(
    ctx.publicMethodDeclarationList(),
  );
  const privateMethodNodes = thisVisitor.visit(ctx.privateMethodDeclarationList());

  const metadata = produceMetadata(ctx, thisVisitor);
  const entityValuesNode = new EntityValuesNodeBuilder(metadata)
    .withConstants(constantVarNodes)
    .withCreate(domainConstructorDeclarationNode)
    .withPublicMethods(publicMethodNodes)
    .withPrivateMethods(privateMethodNodes)
    .build();
  return entityValuesNode;
};
