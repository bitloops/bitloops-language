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
import { RouterExpressionNodeBuilder } from '../../../intermediate-ast/builders/setup/RouterExpressionNodeBuilder.js';
import { RestRouterNode } from '../../../intermediate-ast/nodes/setup/RestRouterNode.js';
import { RouterArgumentsNode } from '../../../intermediate-ast/nodes/setup/RouterArgumentsNode.js';
import { RouterControllersNode } from '../../../intermediate-ast/nodes/setup/RouterControllersNode.js';
import { RouterExpressionNode } from '../../../intermediate-ast/nodes/setup/RouterExpressionNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const routerExpressionVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RouterExpressionContext,
): RouterExpressionNode => {
  const restRouterNode: RestRouterNode = thisVisitor.visit(ctx.restRouter());
  const routerArgumentsNode: RouterArgumentsNode = thisVisitor.visit(ctx.routerArguments());
  const routerControllersNode: RouterControllersNode = thisVisitor.visit(ctx.routerControllers());

  const metadata = produceMetadata(ctx, thisVisitor);

  return new RouterExpressionNodeBuilder(metadata)
    .withRestRouter(restRouterNode)
    .withRouterArguments(routerArgumentsNode)
    .withRouterControllers(routerControllersNode)
    .build();
};
