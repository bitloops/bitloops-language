import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { produceMetadata } from '../metadata.js';
import { PropsIdentifierNode } from '../../intermediate-ast/nodes/Props/PropsIdentifierNode.js';
import { ParameterNode } from '../../intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../intermediate-ast/directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { ParameterNodeBuilder } from '../../intermediate-ast/builders/ParameterList/ParameterNodeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ParameterIdentifierNode } from '../../intermediate-ast/nodes/ParameterList/ParameterIdentifierNode.js';

export const domainCreateParameterVisitor = (
  _thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainCreateParamContext,
): ParameterNode => {
  const propsIdentifier: PropsIdentifierNode = _thisVisitor.visit(ctx.propsIdentifier());
  const type: BitloopsPrimaryTypeNode = new BitloopsPrimaryTypeNodeBuilderDirector(
    propsIdentifier.getMetadata(),
  ).buildIdentifierPrimaryType(propsIdentifier.getIdentifierName());

  const parameterIdentifier: ParameterIdentifierNode = _thisVisitor.visit(
    ctx.parameterIdentifier(),
  );

  const metadata = produceMetadata(ctx, _thisVisitor);
  return new ParameterNodeBuilder(metadata)
    .withIdentifier(parameterIdentifier)
    .withType(type)
    .build();
};
