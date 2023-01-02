import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { StringLiteralBuilder } from '../../../intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { RestServerNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerNodeBuilder.js';
import { ServerOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerOptionsNodeBuilder.js';
import { ServerRouteNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRouteNodeBuilder.js';
import { ServerRoutesNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRoutesNodeBuilder.js';
import { ServerTypeIdentifierNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerTypeIdentifierNodeBuilder.js';
import { ExpressionNode } from '../../../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../intermediate-ast/nodes/identifier/IdentifierNode.js';
// import { StringLiteralNode } from '../../../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';
import { RestServerNode } from '../../../intermediate-ast/nodes/setup/RestServerNode.js';
import { ServerOptionNode } from '../../../intermediate-ast/nodes/setup/ServerOptionNode.js';
import { ServerOptionsNode } from '../../../intermediate-ast/nodes/setup/ServerOptionsNode.js';
import { ServerRoutesNode } from '../../../intermediate-ast/nodes/setup/ServerRoutesNode.js';
import { ServerTypeIdentifierNode } from '../../../intermediate-ast/nodes/setup/ServerTypeIdentifierNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const restServerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestServerDeclarationContext,
): RestServerNode => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const serverOptions = thisVisitor.visit(ctx.serverInstantiationOptions());
  const serverOptionsNodes: ServerOptionNode[] = serverOptions
    .filter((child) => child !== undefined)
    .map((child) => child[0]);

  const serverOptionsNode = new ServerOptionsNodeBuilder()
    .withServerOptions(serverOptionsNodes)
    .build();

  const routes: ServerRoutesNode = thisVisitor.visit(ctx.bindServerRoutes());

  const restServerNode = new RestServerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withServerOptions(serverOptionsNode)
    .withRoutes(routes)
    .build();
  return restServerNode;
};

//TODO this is not visited/ delete or replace the
// restServerDeclarationVisitor part with below section
export const serverInstantiationOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerInstantiationOptionsContext,
): ServerOptionsNode => {
  const serverOptions = thisVisitor.visitChildren(ctx);

  const serverOptionsNodes: ServerOptionNode[] = serverOptions.filter(
    (child) => child !== undefined,
  );

  const serverOptionsNode = new ServerOptionsNodeBuilder()
    .withServerOptions(serverOptionsNodes)
    .build();
  return serverOptionsNode;
};

export const serverTypeOptionVisitor = (
  ctx: BitloopsParser.ServerTypeOptionContext,
): ServerTypeIdentifierNode => {
  return new ServerTypeIdentifierNodeBuilder()
    .withServerTypeIdentifier(ctx.ServerTypeOption().getText())
    .build();
};

export const customServerOptionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CustomServerOptionContext,
): ExpressionNode => {
  const expressionNode = thisVisitor.visit(ctx.expression());
  return expressionNode;
};

export const bindServerRoutesVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BindServerRoutesContext,
): ServerRoutesNode => {
  const serverRoutes = thisVisitor.visitChildren(ctx);
  const routeBinds = serverRoutes.filter((child) => child !== undefined);

  const serverRoutesNode: ServerRoutesNode = new ServerRoutesNodeBuilder()
    .withServerRoutes(routeBinds)
    .build();

  return serverRoutesNode;
};

export const bindServerRouteVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RouteBindContext,
): ServerRoutesNode => {
  const routePath = new StringLiteralBuilder().withValue(ctx.pathString()).build();
  const identifier: IdentifierNode = thisVisitor.visit(ctx.identifier());

  const serverRoutesNode: ServerRoutesNode = new ServerRouteNodeBuilder()
    .withInstanceName(identifier)
    .withRouterPrefix(routePath)
    .build();

  return serverRoutesNode;
};
