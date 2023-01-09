import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { BoundedContextModuleNode } from '../../../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { ControllerResolverBindNode } from '../../../intermediate-ast/nodes/setup/ControllerResolverBindNode.js';
import { ArgumentListNode } from '../../../intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ControllerResolverBindNodeBuilder } from '../../../intermediate-ast/builders/setup/ControllerResolverBindNodeBuilder.js';
import { ControllerResolversNode } from '../../../intermediate-ast/nodes/setup/ControllerResolversNode.js';
import { ControllerResolversNodeBuilder } from '../../../intermediate-ast/builders/setup/ControllerResolversNodeBuilder.js';
import { GraphQLServerInstantiationOptionsNode } from '../../../intermediate-ast/nodes/setup/GraphQLServerInstantiationOptionsNode.js';

export const controllerResolverBindVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ControllerResolverBindContext,
): ControllerResolverBindNode => {
  const boundedContextModuleNode: BoundedContextModuleNode = thisVisitor.visit(
    ctx.boundedContextModuleDeclaration(),
  );
  const methodArguments: ArgumentListNode = thisVisitor.visit(ctx.methodArguments());
  const metadata = produceMetadata(ctx, thisVisitor);

  return new ControllerResolverBindNodeBuilder(metadata)
    .withBoundedContextModule(boundedContextModuleNode)
    .withMethodArguments(methodArguments)
    .build();
};

export const bindControllerResolversVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BindControllerResolversContext,
): ControllerResolversNode => {
  const controllerResolvers = thisVisitor.visitChildren(ctx);
  const controllerResolverBinds = controllerResolvers.filter((child) => child !== undefined);
  const metadata = produceMetadata(ctx, thisVisitor);

  return new ControllerResolversNodeBuilder(metadata)
    .withControllerResolvers(controllerResolverBinds)
    .build();
};

// export const graphQLServerInstantiationOptionsVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.GraphQLServerInstantiationOptionsContext,
// ): GraphQLServerInstantiationOptionsNode => {
//   return;
// };
