import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { RestServerNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerNodeBuilder.js';
import { ServerTypeIdentifierNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerTypeIdentifierNodeBuilder.js';
// import { StringLiteralNode } from '../../../intermediate-ast/nodes/Expression/Literal/StringLiteralNode.js';
import { RestServerNode } from '../../../intermediate-ast/nodes/setup/RestServerNode.js';
import { ServerRouteNode } from '../../../intermediate-ast/nodes/setup/ServerRouteNode.js';
import { ServerRoutesNode } from '../../../intermediate-ast/nodes/setup/ServerRoutesNode.js';
import { ServerTypeIdentifierNode } from '../../../intermediate-ast/nodes/setup/ServerTypeIdentifierNode.js';
import { SetupExpressionNode } from '../../../intermediate-ast/nodes/setup/SetupExpressionNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const restServerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestServerDeclarationContext,
): RestServerNode => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const serverTypeNode = new ServerTypeIdentifierNodeBuilder()
    .withServerTypeIdentifier(ctx.RESTServer().getText())
    .build();

  //   const serverOptions = thisVisitor.visit(ctx.serverInstantiationOptions());
  // const apiPrefix: StringLiteralNode = thisVisitor.visit(ctx.serverApiPrefixOption);
  // const apiPort = thisVisitor.visit(ctx.serverApiPrefixOption());
  const routes: ServerRoutesNode = thisVisitor.visit(ctx.bindServerRoutes());

  const restServerNode = new RestServerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    // .withAPIPrefix(apiPrefix)
    // .withPort(apiPort)
    .withRoutes(routes)
    .withServerType(serverTypeNode)
    .build();
  return restServerNode;
};

// export const serverInstantiationOptionsVisitor = (
//   thisVisitor: BitloopsVisitor,
//   ctx: BitloopsParser.ServerInstantiationOptionsContext,
// ) => {
//   const serverOptions = thisVisitor.visitChildren(ctx);

//   // Ignore first and last Curly braces
//   const options = serverOptions.slice(1, serverOptions.length - 1);
//   return options.reduce((acc, option) => {
//     return { ...acc, ...option[0] };
//   }, {});
// };

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
): SetupExpressionNode => {
  const expressionNode = thisVisitor.visit(ctx.expression());

  return expressionNode;
};

export const bindServerRoutesVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.BindServerRoutesContext,
): ServerRouteNode[] => {
  const serverRoutes: ServerRouteNode[] = thisVisitor.visitChildren(ctx);

  const routeBinds = serverRoutes.filter((child) => child !== undefined);

  return routeBinds;
};
