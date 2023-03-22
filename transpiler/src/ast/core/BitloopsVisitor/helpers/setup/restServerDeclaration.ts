/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import BitloopsParser from '../../../../../parser/core/grammar/BitloopsParser.js';
import { RestServerNodeBuilder } from '../../../intermediate-ast/builders/setup/RestServerNodeBuilder.js';
import { RestServerRouterPrefixNodeBuilder } from '../../../intermediate-ast/builders/setup/RouterPrefixNodeBuilder.js';
import { ServerOptionsNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerOptionsNodeBuilder.js';
import { ServerRouteNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRouteNodeBuilder.js';
import { ServerRoutesNodeBuilder } from '../../../intermediate-ast/builders/setup/ServerRoutesNodeBuilder.js';
import { IdentifierNode } from '../../../intermediate-ast/nodes/identifier/IdentifierNode.js';
import { RestServerRouterPrefixNode } from '../../../intermediate-ast/nodes/setup/RestServerRouterPrefixNode.js';
import { ServerOptionsNode } from '../../../intermediate-ast/nodes/setup/ServerOptionsNode.js';
import { ServerRouteNode } from '../../../intermediate-ast/nodes/setup/ServerRouteNode.js';
import { ServerRoutesNode } from '../../../intermediate-ast/nodes/setup/ServerRoutesNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const restServerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestServerDeclarationContext,
): void => {
  const metadata = produceMetadata(ctx, thisVisitor);

  const serverOptionsNode = thisVisitor.visit(ctx.serverInstantiationOptions());

  const routes: ServerRoutesNode = thisVisitor.visit(ctx.bindServerRoutes());

  new RestServerNodeBuilder(thisVisitor.intermediateASTTree, metadata)
    .withServerOptions(serverOptionsNode)
    .withRoutes(routes)
    .build();
};

export const serverInstantiationOptionsVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.ServerInstantiationOptionsContext,
): ServerOptionsNode => {
  const metadata = produceMetadata(ctx, thisVisitor);
  const evaluationFieldListNode = thisVisitor.visit(ctx.evaluationFieldList());

  return new ServerOptionsNodeBuilder(metadata).withFields(evaluationFieldListNode).build();
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
