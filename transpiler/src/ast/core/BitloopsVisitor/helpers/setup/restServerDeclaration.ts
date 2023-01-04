import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { CorsOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/CorsOptionsNodeBuilder.js';
import { CorsOriginNodeBuilder } from '../../../intermediate-ast/builders/setup/CorsOriginNodeBuilder.js';
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
import { CorsOptionsNode } from '../../../intermediate-ast/nodes/setup/CorsOptionsNode.js';
import { CorsOriginNode } from '../../../intermediate-ast/nodes/setup/CorsOriginNode.js';
import { RestServerNode } from '../../../intermediate-ast/nodes/setup/RestServerNode.js';
import { RestServerPortNode } from '../../../intermediate-ast/nodes/setup/RestServerPortNode.js';
import { RestServerRouterPrefixNode } from '../../../intermediate-ast/nodes/setup/RestServerRouterPrefixNode.js';
import { ServerOptionsNode } from '../../../intermediate-ast/nodes/setup/ServerOptionsNode.js';
import { ServerRouteNode } from '../../../intermediate-ast/nodes/setup/ServerRouteNode.js';
import { ServerRoutesNode } from '../../../intermediate-ast/nodes/setup/ServerRoutesNode.js';
import { ServerTypeIdentifierNode } from '../../../intermediate-ast/nodes/setup/ServerTypeIdentifierNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';
import { stringEvaluation } from '../index.js';

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
  const metadata = produceMetadata(ctx, thisVisitor);
  const serverTypeOptionNode = thisVisitor.visit(ctx.serverTypeOption(0));
  const restServerPortNode = thisVisitor.visit(ctx.restServerPort(0));
  if (ctx.serverApiPrefixOption(0) && ctx.corsOptions(0)) {
    const serverApiPrefixOptionNode = thisVisitor.visit(ctx.serverApiPrefixOption(0));
    const corsOptionsNode = thisVisitor.visit(ctx.corsOptions(0));
    return new ServerOptionsNodeBuilder(metadata)
      .withAPIPrefix(serverApiPrefixOptionNode)
      .withPort(restServerPortNode)
      .withServerType(serverTypeOptionNode)
      .withCorsOptions(corsOptionsNode)
      .build();
  } else if (ctx.serverApiPrefixOption(0) && !ctx.corsOptions(0)) {
    const serverApiPrefixOptionNode = thisVisitor.visit(ctx.serverApiPrefixOption(0));
    return new ServerOptionsNodeBuilder(metadata)
      .withAPIPrefix(serverApiPrefixOptionNode)
      .withPort(restServerPortNode)
      .withServerType(serverTypeOptionNode)
      .build();
  } else if (!ctx.serverApiPrefixOption(0) && ctx.corsOptions(0)) {
    const corsOptionsNode = thisVisitor.visit(ctx.corsOptions(0));
    return new ServerOptionsNodeBuilder(metadata)
      .withCorsOptions(corsOptionsNode)
      .withPort(restServerPortNode)
      .withServerType(serverTypeOptionNode)
      .build();
  } else {
    return new ServerOptionsNodeBuilder(metadata)
      .withPort(restServerPortNode)
      .withServerType(serverTypeOptionNode)
      .build();
  }
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

export const restServerPortVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestServerPortContext,
): RestServerPortNode => {
  const expressionNode: ExpressionNode = thisVisitor.visit(ctx.expression());
  const metadata = produceMetadata(ctx, thisVisitor);
  const portNode = new RestServerPortNodeBuilder(metadata).withPort(expressionNode).build();
  return portNode;
};

export const restServerAPIPrefixVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerApiPrefixOptionContext,
): RestServerPortNode => {
  const apiPrefixStringNode = thisVisitor.visit(ctx.pathString());

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
): ServerRouteNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const pathStringlNode = thisVisitor.visit(ctx.pathString());

  const routerPrefixNode: RestServerRouterPrefixNode = new RestServerRouterPrefixNodeBuilder()
    .witRouterPrefix(pathStringlNode)
    .build();
  const identifier: IdentifierNode = thisVisitor.visit(ctx.identifier());

  const serverRoutesNode: ServerRoutesNode = new ServerRouteNodeBuilder(metadata)
    .withInstanceName(identifier)
    .withRouterPrefix(routerPrefixNode)
    .build();

  return serverRoutesNode;
};

export const corsOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.CorsOptionsContext,
): CorsOptionsNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const origin = thisVisitor.visit(ctx.origin());

  const corsOptionsNode = new CorsOptionsNodeBuilder(metadata).withOrigin(origin).build();
  return corsOptionsNode;
};

export const corsOriginVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.OriginContext,
): CorsOriginNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const origin = stringEvaluation(ctx.StringLiteral().getText());

  const corsOriginNode = new CorsOriginNodeBuilder(metadata).withOrigin(origin).build();
  return corsOriginNode;
};
