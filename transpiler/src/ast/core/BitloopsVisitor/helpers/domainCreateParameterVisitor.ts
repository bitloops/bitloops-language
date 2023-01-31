import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import { DomainCreateParameterNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterNodeBuilder.js';
import { DomainCreateParameterNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterNode.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { DomainCreateParameterTypeNode } from '../../intermediate-ast/nodes/Domain/DomainCreateParameterTypeNode.js';
import { DomainCreateParameterTypeNodeBuilder } from '../../intermediate-ast/builders/Domain/DomainCreateParameterTypeNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { IdentifierNode } from '../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { produceMetadata } from '../metadata.js';

export const domainCreateParameterVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainConstructorParamContext,
): DomainCreateParameterNode => {
  const metadata = produceMetadata(ctx, _thisVisitor);

  const parameterIdentifier: IdentifierNode = new IdentifierNodeBuilder(metadata)
    .withName(ctx.id.text)
    .build();
  const parameterType: DomainCreateParameterTypeNode = new DomainCreateParameterTypeNodeBuilder(
    metadata,
  )
    .withValue(ctx.type.text)
    .build();

  const domainConstructorParameterNode = new DomainCreateParameterNodeBuilder(metadata)
    .withIdentifierNode(parameterIdentifier)
    .withTypeNode(parameterType)
    .build();

  return domainConstructorParameterNode;
};
