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
import { RouterControllerNodeBuilder } from '../../../intermediate-ast/builders/setup/RouterControllerNodeBuilder.js';
import { ArgumentListNode } from '../../../intermediate-ast/nodes/ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../../../intermediate-ast/nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { BoundedContextModuleNode } from '../../../intermediate-ast/nodes/setup/BoundedContextModuleNode.js';
import { HTTPMethodVerbNode } from '../../../intermediate-ast/nodes/setup/HTTPMethodVerbNode.js';
import { RouterControllerNode } from '../../../intermediate-ast/nodes/setup/RouterControllerNode.js';
import BitloopsVisitor from '../../BitloopsVisitor.js';
import { produceMetadata } from '../../metadata.js';

export const routerControllerVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RouterControllerContext,
): RouterControllerNode => {
  const methodNode: HTTPMethodVerbNode = thisVisitor.visit(ctx.httpMethodVerb());
  const pathStringNode: PathStringNode = thisVisitor.visit(ctx.pathString());
  const boundedContextModuleNode: BoundedContextModuleNode = thisVisitor.visit(
    ctx.boundedContextModuleDeclaration(),
  );
  const restControllerIdentifierNode: RESTControllerIdentifierNode = thisVisitor.visit(
    ctx.restControllerIdentifier(),
  );
  const argumentListNode: ArgumentListNode = thisVisitor.visit(ctx.methodArguments());

  const metadata = produceMetadata(ctx, thisVisitor);

  return new RouterControllerNodeBuilder(metadata)
    .withMethod(methodNode)
    .withPath(pathStringNode)
    .withBoundedContextModule(boundedContextModuleNode)
    .withControllerIdentifier(restControllerIdentifierNode)
    .withArguments(argumentListNode)
    .build();
};
