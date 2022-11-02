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
import {
  scanStatementForIdentifierToAppendDotValue,
  isVariableOrConstDeclarationWithDomainEvaluation,
  getVariableOrConstDeclarationIdentifier,
} from './helpers/appendDotValue.js';
import { scanStatementForDepsToPrependAwait } from './helpers/prependAwait.js';
import { TUseCase } from '../../../../../../types.js';

const transformUseCaseIntermediateAST = (useCases: TUseCase): TUseCase => {
  for (const useCaseValues of Object.values(useCases)) {
    const { statements } = useCaseValues.execute;

    const statementsWithAwait = statements.map((statement) => {
      return scanStatementForDepsToPrependAwait(statement);
    });

    const initialReducerStruct = {
      identifiers: new Set<string>(),
      statements: [],
    };
    const newStatements = statementsWithAwait.reduce((acc, statement) => {
      const { identifiers, statements } = acc;

      // Check this statement for identifiers
      const newStatement = scanStatementForIdentifierToAppendDotValue(statement, identifiers);
      statements.push(newStatement);
      if (isVariableOrConstDeclarationWithDomainEvaluation(statement)) {
        const evaluationIdentifier = getVariableOrConstDeclarationIdentifier(statement);
        identifiers.add(evaluationIdentifier);
      }
      return acc;
    }, initialReducerStruct);

    useCaseValues.execute.statements = newStatements.statements;
  }

  return useCases;
};

export { transformUseCaseIntermediateAST };
