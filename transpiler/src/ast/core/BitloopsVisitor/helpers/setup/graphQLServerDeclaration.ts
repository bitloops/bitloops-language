import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { BoundedContextModuleNode } from '../../../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { ControllerResolverNode } from '../../../intermediate-ast/nodes/setup/ControllerResolverNode.js';
import { ArgumentListNode } from '../../../intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { ControllerResolverNodeBuilder } from '../../../intermediate-ast/builders/setup/ControllerResolverNodeBuilder.js';
import { ControllerResolversNode } from '../../../intermediate-ast/nodes/setup/ControllerResolversNode.js';
import { ControllerResolversNodeBuilder } from '../../../intermediate-ast/builders/setup/ControllerResolversNodeBuilder.js';
import { GraphQLServerOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/GraphQLServerOptionsNodeBuilder.js';
import { GraphQLServerOptionsNode } from '../../../intermediate-ast/nodes/setup/GraphQLServerOptionsNode.js';
import { GraphQLServerNode } from '../../../intermediate-ast/nodes/setup/GraphQLServerNode.js';
import { GraphQLServerNodeBuilder } from '../../../intermediate-ast/builders/setup/GraphQLServerNodeBuilder.js';
import { GraphQLControllerIdentifierNodeBuilder } from '../../../intermediate-ast/builders/controllers/graphQL/RESTControllerIdentifierNodeBuilder.js';

export const graphQLServerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLServerDeclarationContext,
): GraphQLServerNode => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const graphQLServerInstantiationOptionsNode: GraphQLServerOptionsNode = thisVisitor.visit(
    ctx.graphQLServerInstantiationOptions(),
  );

  const controllerResolvers: ControllerResolversNode = thisVisitor.visit(
    ctx.bindControllerResolvers(),
  );

  return new GraphQLServerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withServerOptions(graphQLServerInstantiationOptionsNode)
    .withControllerResolvers(controllerResolvers)
    .build();
};

export const graphQLServerInstantiationOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLServerInstantiationOptionsContext,
): GraphQLServerOptionsNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const evaluationFieldListNode = thisVisitor.visit(ctx.evaluationFieldList());

  return new GraphQLServerOptionsNodeBuilder(metadata).withFields(evaluationFieldListNode).build();
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

export const controllerResolverBindVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ControllerResolverBindContext,
): ControllerResolverNode => {
  const boundedContextModuleNode: BoundedContextModuleNode = thisVisitor.visit(
    ctx.boundedContextModuleDeclaration(),
  );
  const controllerIdentifier: string = ctx.ControllerIdentifier().getText();
  const methodArguments: ArgumentListNode = thisVisitor.visit(ctx.methodArguments());
  const metadata = produceMetadata(ctx, thisVisitor);

  return new ControllerResolverNodeBuilder(metadata)
    .withClassName(
      new GraphQLControllerIdentifierNodeBuilder(null).withName(controllerIdentifier).build(),
    )
    .withBoundedContextModule(boundedContextModuleNode)
    .withMethodArguments(methodArguments)
    .build();
};
