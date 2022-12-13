/**
 *  Bitloops Language
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
import { TRESTController } from '../../../../../../types.js';
import {
  findUseCaseExecuteResultIdentifier,
  isUseCaseExecuteStatement,
  prependAwaitToExecute,
} from './helpers/prependAwait.js';
import { scanStatementForUseCaseResult } from './helpers/useCaseResultValue.js';
// import { IntermediateASTTree } from './../../../../../../refactoring-arch/intermediate-ast/IntermediateASTTree.js';
// import { StatementNode } from '../../../../../../refactoring-arch/intermediate-ast/nodes/Statement.js';
// import { MethodCallExpressionNode } from '../../../../../../refactoring-arch/intermediate-ast/nodes/Expression/MethodCallExpression.js';

const transformRestControllerIntermediateAST = (controllers: TRESTController): TRESTController => {
  for (const controllerValues of Object.values(controllers)) {
    const { statements } = controllerValues.execute;

    let useCaseExecuteFound = false;
    let useCaseResultIdentifier = '';
    const newStatements = statements.map((statement) => {
      if (isUseCaseExecuteStatement(statement)) {
        useCaseExecuteFound = true;
        const statementWithAwait = prependAwaitToExecute(statement);
        useCaseResultIdentifier = findUseCaseExecuteResultIdentifier(statementWithAwait);
        return statementWithAwait;
      }

      if (useCaseExecuteFound) {
        return scanStatementForUseCaseResult(statement, useCaseResultIdentifier);
      }

      return statement;
    });

    controllerValues.execute.statements = newStatements;
  }

  return controllers;
};

export { transformRestControllerIntermediateAST };
