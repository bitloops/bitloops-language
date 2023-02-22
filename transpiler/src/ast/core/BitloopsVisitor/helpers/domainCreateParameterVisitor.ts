import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { DomainCreateParameterTypeNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterTypeNode.js';
import { DomainCreateParameterTypeNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterTypeNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { produceMetadata } from '../metadata.js';
import { PropsIdentifierNode } from '../../intermediate-ast/nodes/Props/PropsIdentifierNode.js';

export const domainCreateParameterVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainCreateParamContext,
): DomainCreateParameterNode => {
  const metadata = produceMetadata(ctx, _thisVisitor);

  const identifierName: IdentifierNode = _thisVisitor.visit(ctx.identifier());
  const propsIdentifier: PropsIdentifierNode = _thisVisitor.visit(ctx.propsIdentifier());
  const parameterIdentifier: IdentifierNode = new IdentifierNodeBuilder(metadata)
    .withName(identifierName.getIdentifierName())
    .build();
  const parameterType: DomainCreateParameterTypeNode = new DomainCreateParameterTypeNodeBuilder(
    propsIdentifier.getMetadata(),
  )
    .withValue(propsIdentifier.getIdentifierName())
    .build();

  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder(metadata)
    .withIdentifierNode(parameterIdentifier)
    .withTypeNode(parameterType)
    .build();

  return domainConstructorParameterNode;
};
