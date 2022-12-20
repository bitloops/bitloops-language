import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const domainConstructorParameterVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PropsDeclarationContext,
): DomainCreateParameterNode => {
  const identifierNode = thisVisitor.visit(ctx.propsIdentifier);
  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder()
    .withIdentifierNode(identifierNode)
    .build();

  return domainConstructorParameterNode;
};
