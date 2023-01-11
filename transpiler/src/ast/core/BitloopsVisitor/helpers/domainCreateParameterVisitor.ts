import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import { PropsIdentifierNodeBuilder } from '../../intermediate-ast/builders/Props/PropsIdentifierNodeBuilder.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { PropsIdentifierNode } from '../../intermediate-ast/nodes/Props/PropsIdentifierNode.js';
import { DomainCreateParameterTypeNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterTypeNode.js';
import { DomainCreateParameterTypeNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterTypeNodeBuilder.js';

export const domainCreateParameterVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainConstructorParamContext,
): DomainCreateParameterNode => {
  const parameterIdentifier: PropsIdentifierNode = new PropsIdentifierNodeBuilder()
    .withName(ctx.id.text)
    .build();
  const parameterType: DomainCreateParameterTypeNode = new DomainCreateParameterTypeNodeBuilder()
    .withValue(ctx.type.text)
    .build();

  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder()
    .withIdentifierNode(parameterIdentifier)
    .withTypeNode(parameterType)
    .build();

  return domainConstructorParameterNode;
};
