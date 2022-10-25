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
  TUseCaseValues,
  TOkErrorReturnType,
  TExecute,
  TParameterDependency,
  TParameterDependencies,
} from '../../../../types.js';
import { addReturnOkVoidStatement } from './addReturnOkVoidStatement.js';

type UseCaseExecuteDeclarationResult = { returnTypes: TOkErrorReturnType; execute: TExecute };

export const useCaseDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.UseCaseDeclarationContext,
): { UseCases: { [useCaseIdentifier: string]: TUseCaseValues } } => {
  const useCaseIdentifier = ctx.useCaseIdentifier().getText();
  // const returnTypes: TOkErrorReturnType = thisVisitor.visit(ctx.)
  const { returnTypes, execute }: UseCaseExecuteDeclarationResult = thisVisitor.visit(
    ctx.useCaseExecuteDeclaration(),
  );
  const parameterDependencies: TParameterDependencies = thisVisitor.visit(
    ctx.formalParameterList(),
  );
  const { statements } = execute;

  addReturnOkVoidStatement(statements, returnTypes);
  const result = {
    UseCases: {
      [useCaseIdentifier]: {
        returnTypes,
        execute,
        parameterDependencies,
      },
    },
  };
  return result;
};

export const useCaseExecuteDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.UseCaseExecuteDeclarationContext,
): UseCaseExecuteDeclarationResult => {
  const returnTypes: TOkErrorReturnType = thisVisitor.visit(ctx.returnOkErrorType());
  const formalParameterList: TParameterDependency[] = thisVisitor.visit(ctx.formalParameterList());
  const { statements } = thisVisitor.visit(ctx.functionBody());

  return {
    returnTypes,
    execute: {
      parameterDependencies: formalParameterList,
      statements,
    },
  };
};
