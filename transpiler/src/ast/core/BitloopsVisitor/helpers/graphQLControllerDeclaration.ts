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
import { TGraphQLControllerValues, TGraphQLControllerExecute } from '../../../../types.js';

const TYPE_OF_GRAPHQL_CONTROLLER = 'graphql';

export const graphQLControllerDeclarationVisitor = (
  thisVisitor: BitloopsVisitor,
  ctx: BitloopsParser.GraphQLControllerDeclarationContext,
): { Controllers: { [id: string]: TGraphQLControllerValues } } => {
  const identifier = ctx.ControllerIdentifier().getText();
  const dependencies = thisVisitor.visit(ctx.parameterList());
  const resolverOptions = thisVisitor.visit(ctx.graphQLResolverOptions());
  const { operationType, inputType } = resolverOptions;
  const execute: TGraphQLControllerExecute = thisVisitor.visit(
    ctx.graphQLControllerExecuteDeclaration(),
  );
  const outputType = execute.returnType;

  // Operation name is auto-generated from the controller name
  const operationName = getOperationName(identifier);
  const controllerValue: TGraphQLControllerValues = {
    execute,
    operationType,
    inputType,
    outputType,
    operationName,
    type: TYPE_OF_GRAPHQL_CONTROLLER,
    parameterDependencies: dependencies,
  };

  const response = {
    Controllers: {
      [identifier]: controllerValue,
    },
  };
  return response;
};

const getOperationName = (controllerName: string): string => {
  const suffixLength = 'Controller'.length;
  const operationNamePascal = controllerName.substring(0, controllerName.length - suffixLength);
  const operationName = operationNamePascal.charAt(0).toLowerCase() + operationNamePascal.slice(1);
  return operationName;
};
