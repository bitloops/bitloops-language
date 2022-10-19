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
import { TEntityCreate } from '../../../../types.js';

export const domainConstructorDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.DomainConstructorDeclarationContext,
): TEntityCreate => {
  // console.log('ctx', ctx.structEvaluationIdentifier().getText());
  const { statements } = thisVisitor.visit(ctx.functionBody());
  const returnType = thisVisitor.visit(ctx.returnOkErrorType());
  const parameters = thisVisitor.visit(ctx.formalParameterList());
  const result: TEntityCreate = {
    returnType,
    statements,
    parameterDependency: parameters[0],
  };
  //   console.log('result', result);
  return result;
};
