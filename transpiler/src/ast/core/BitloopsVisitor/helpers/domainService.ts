import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainServiceNodeBuilder } from '../../intermediate-ast/builders/DomainServiceNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { PrivateMethodDeclarationListNodeBuilder } from '../../intermediate-ast/builders/methods/PrivateMethodDeclarationListNodeBuilder.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { PrivateMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PrivateMethodDeclarationListNode.js';
import { PublicMethodDeclarationListNode } from '../../intermediate-ast/nodes/methods/PublicMethodDeclarationListNode.js';
import { ParameterListNode } from '../../intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';

//TODO add support for const declarations?
export const domainServiceDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainServiceDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const domainServiceIdentifier: IdentifierNode = thisVisitor.visit(ctx.domainServiceIdentifier());
  const domainServicePublicMethods: PublicMethodDeclarationListNode = thisVisitor.visit(
    ctx.publicMethodDeclarationList(),
  );

  let domainServicePrivateMethods: PrivateMethodDeclarationListNode;
  if (ctx.privateMethodDeclarationList()) {
    domainServicePrivateMethods = thisVisitor.visit(ctx.privateMethodDeclarationList());
  } else {
    domainServicePrivateMethods = new PrivateMethodDeclarationListNodeBuilder()
      .withMethods([])
      .build();
  }

  const domainServiceParameters: ParameterListNode = thisVisitor.visit(ctx.parameterList());

  new DomainServiceNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withIdentifier(domainServiceIdentifier)
    .withParameters(domainServiceParameters)
    .withPublicMethods(domainServicePublicMethods)
    .withPrivateMethods(domainServicePrivateMethods)
    .build();
};

export const domainServiceIdentifierVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainServiceIdentifierContext,
): IdentifierNode => {
  const domainServiceIdentifier = ctx.DomainServiceIdentifier().getText();
  return new IdentifierNodeBuilder(produceMetadata(ctx, thisVisitor))
    .withName(domainServiceIdentifier)
    .build();
};
