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

import BitloopsParser from '../../../../parser/core/grammar/BitloopsParser.js';
import BitloopsVisitor from '../BitloopsVisitor.js';
import { TGraphQLControllerExecute } from '../../../../types.js';

export const graphQLControllerExecuteVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerExecuteDeclarationContext,
): TGraphQLControllerExecute => {
  // const { dependencies } = this.visit(ctx.graphQLControllerParameters());
  const dependencies: [string] = [ctx.graphQLControllerParameters().getText()];
  // Same as execute outputType
  const returnType = ctx.graphQLControllerReturnType().getText();
  const { statements } = thisVisitor.visit(ctx.functionBody());
  return { dependencies, returnType, statements };
};
