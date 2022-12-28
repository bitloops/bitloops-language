import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';

export const domainConstructorParameterVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainConstructorParamContext,
): DomainCreateParameterNode => {
  const parameterNode = thisVisitor.visit(ctx.parameter());
  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder()
    .withParameter(parameterNode)
    .build();

  return domainConstructorParameterNode;
};
