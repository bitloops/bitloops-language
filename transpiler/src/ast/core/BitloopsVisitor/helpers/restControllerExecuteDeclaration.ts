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

import { RESTControllerExecuteNodeBuilder } from './../../intermediate-ast/builders/controllers/restController/RESTControllerExecuteNodeBuilder.js';
import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { RESTControllerExecuteDependenciesNode } from '../../intermediate-ast/nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';

export const restControllerExecuteDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.RestControllerExecuteDeclarationContext,
): any => {
  // const { dependencies }
  const dependencies: RESTControllerExecuteDependenciesNode = thisVisitor.visit(
    ctx.restControllerParameters(),
  );
  const statementList = thisVisitor.visit(ctx.functionBody());
  return new RESTControllerExecuteNodeBuilder()
    .withDependencies(dependencies)
    .withStatementList(statementList)
    .build();
};
