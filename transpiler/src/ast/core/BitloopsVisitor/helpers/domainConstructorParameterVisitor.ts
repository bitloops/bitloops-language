import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const domainConstructorParameterVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainConstructorParamContext,
): DomainCreateParameterNode => {
  const parameterIdentifier = ctx.id.text;
  const parameterType = ctx.val.text;
  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder()
    .withIdentifierNode(parameterIdentifier)
    .withTypeNode(parameterType)
    .build();

  return domainConstructorParameterNode;
};
