import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { StringLiteralBuilder } from '../../../intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { RestServerAPIPrefixNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerAPIPrefixNodeBuilder.js';
import { RestServerNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerNodeBuilder.js';
import { RestServerPortNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerPortNodeBuilder.js';
import { RestServerRouterPrefixNodeBuilder } from '../../../intermediate-ast/builders/setup/RouterPrefixNodeBuilder.js';
import { ServerOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerOptionsNodeBuilder.js';
import { ServerRouteNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRouteNodeBuilder.js';
import { ServerRoutesNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRoutesNodeBuilder.js';
import { ServerTypeIdentifierNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerTypeIdentifierNodeBuilder.js';
import { ExpressionNode } from '../../../intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { RestServerNode } from '../../../intermediate-ast/nodes/setup/RestServerNode.js';
import { RestServerPortNode } from '../../../intermediate-ast/nodes/setup/RestServerPortNode.js';
import { RestServerRouterPrefixNode } from '../../../intermediate-ast/nodes/setup/RestServerRouterPrefixNode.js';
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

  const serverOptionsNode = thisVisitor.visit(ctx.serverInstantiationOptions());

  const routes: ServerRoutesNode = thisVisitor.visit(ctx.bindServerRoutes());

  const restServerNode = new RestServerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withServerOptions(serverOptionsNode)
    .withRoutes(routes)
    .build();
  return restServerNode;
};

export const serverInstantiationOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerInstantiationOptionsContext,
): ServerOptionsNode => {
  const serverOptions = thisVisitor.visitChildren(ctx);

  const serverOptionsNodes: ServerOptionNode[] = serverOptions
    .filter((child) => child !== undefined)
    .map((child) => child[0]);

  const metadata = produceMetadata(ctx, thisVisitor);
  const serverOptionsNode = new ServerOptionsNodeBuilder(metadata)
    .withServerOptions(serverOptionsNodes)
    .build();
  return serverOptionsNode;
};

export const serverTypeOptionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerTypeOptionContext,
): ServerTypeIdentifierNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  return new ServerTypeIdentifierNodeBuilder(metadata)
    .withServerTypeIdentifier(ctx.serverType().getText())
    .build();
};

// export const customServerOptionVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.CustomServerOptionContext,
// ): ExpressionNode => {
//   const identifier = ctx.Identifier().getText();
//   console.log('identifier', identifier);
//   const expressionNode = thisVisitor.visit(ctx.expression());
//   return expressionNode;
// };

export const restServerPortVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestServerPortContext,
): RestServerPortNode => {
  const expressionNode: ExpressionNode = thisVisitor.visit(ctx.expression());
  const metadata = produceMetadata(ctx, thisVisitor);
  const portNode = new RestServerPortNodeBuilder(metadata).withPort(expressionNode).build();
  return portNode;
};

//TODO delete
export const restServerAPIPrefixVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerApiPrefixOptionContext,
): RestServerPortNode => {
  const pathString = ctx.pathString().getText();
  const apiPrefixStringNode = new StringLiteralBuilder().withValue(pathString).build();

  const metadata = produceMetadata(ctx, thisVisitor);
  const apiPrefixNode = new RestServerAPIPrefixNodeBuilder(metadata)
    .withAPIPrefix(apiPrefixStringNode)
    .build();
  return apiPrefixNode;
};

export const bindServerRoutesVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BindServerRoutesContext,
): ServerRoutesNode => {
  const serverRoutes = thisVisitor.visitChildren(ctx);
  const routeBinds = serverRoutes.filter((child) => child !== undefined);
  const metadata = produceMetadata(ctx, thisVisitor);

  const serverRoutesNode: ServerRoutesNode = new ServerRoutesNodeBuilder(metadata)
    .withServerRoutes(routeBinds)
    .build();

  return serverRoutesNode;
};

export const bindServerRouteVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RouteBindContext,
): ServerRoutesNode => {
  const routePrefix = new StringLiteralBuilder().withValue(ctx.pathString().getText()).build();

  const routerPrefixNode: RestServerRouterPrefixNode = new RestServerRouterPrefixNodeBuilder()
    .witRouterPrefix(routePrefix)
    .build();
  const identifier: IdentifierNode = thisVisitor.visit(ctx.identifier());

  const serverRoutesNode: ServerRoutesNode = new ServerRouteNodeBuilder()
    .withInstanceName(identifier)
    .withRouterPrefix(routerPrefixNode)
    .build();

  return serverRoutesNode;
};
