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
import {
  TDomainPublicMethod,
  TParameterDependencies,
  TOkErrorReturnType,
} from '../../../../types.js';
import { addReturnOkVoidStatement } from './addReturnOkVoidStatement.js';
import { modifyReturnOkErrorStatements } from './modifyReturnOkErrorStatements.js';

export const publicMethodDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.PublicMethodDeclarationContext,
): { methodName: string; methodInfo: TDomainPublicMethod } => {
  const methodName = ctx.identifier().getText();
  const parameterDependencies: TParameterDependencies = thisVisitor.visit(ctx.parameterList());
  const returnType: TOkErrorReturnType = thisVisitor.visit(ctx.returnPublicMethodType())[1];
  const { statements } = thisVisitor.visit(ctx.functionBody());
  //change return to returnOk or returnError
  const statementsWithReturn = modifyReturnOkErrorStatements(statements, returnType.returnType);

  addReturnOkVoidStatement(statementsWithReturn, returnType.returnType);

  const methodInfo: TDomainPublicMethod = {
    publicMethod: {
      parameterDependencies,
      returnType: returnType.returnType,
      statements: statementsWithReturn,
    },
  };
  return { methodName, methodInfo };
};
