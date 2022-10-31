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
import { scanStatementForDepsToPrependAwait } from './helpers/index.js';
import { TUseCase } from '../../../../../../types.js';

const transformUseCaseIntermediateAST = (useCases: TUseCase): TUseCase => {
  for (const useCaseValues of Object.values(useCases)) {
    const { statements } = useCaseValues.execute;

    const newStatements = statements.map((statement) => {
      return scanStatementForDepsToPrependAwait(statement);
    });

    useCaseValues.execute.statements = newStatements;
  }

  return useCases;
};

export { transformUseCaseIntermediateAST };
