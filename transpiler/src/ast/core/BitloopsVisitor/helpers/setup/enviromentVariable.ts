import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { LiteralBuilder } from '../../../intermediate-ast/builders/expressions/literal/LiteralBuilder.js';
import { IdentifierNodeBuilder } from '../../../intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { EnviromentalVariableNodeBuilder } from '../../../intermediate-ast/builders/setup/EnviromentalVariableNodeBuilder.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';

export const envVarWithDefaultValueExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.EnvVarWithDefaultValueExpressionContext,
) => {
  const identifierNode = new IdentifierNodeBuilder().withName(ctx.identifier().getText()).build();

  const literalValue = thisVisitor.visit(ctx.literal());
  const literalNode = new LiteralBuilder().withLiteral(literalValue).build();

  const envVar = new EnviromentalVariableNodeBuilder()
    .withIdentifier(identifierNode)
    .withDefaultValue(literalNode)
    .build();

  return envVar;
};

export const enviromentVariableVisitor = (
  ctx: BitloopsParser.EnvironmentVariableExpressionContext,
) => {
  const identifierNode = new IdentifierNodeBuilder().withName(ctx.envVariable()).build();

  const envVar = new EnviromentalVariableNodeBuilder().withIdentifier(identifierNode).build();
  return envVar;
};
