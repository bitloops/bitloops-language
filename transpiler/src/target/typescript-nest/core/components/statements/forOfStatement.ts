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
import { TForOfStatement, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const forOfStatementToTargetLanguage = (
  variable: TForOfStatement,
): TTargetDependenciesTypeScript => {
  const { identifier, expression, statements } = variable.forOfStatement;

  const expressionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: { expression: expression },
  });

  const statementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const res = forOfStatementString(identifier, expressionResult.output, statementsResult.output);

  return {
    output: res,
    dependencies: [...statementsResult.dependencies, ...expressionResult.dependencies],
  };
};

const forOfStatementString = (
  identifier: string,
  expression: string,
  statements: string,
): string => {
  return `for (const ${identifier} of ${expression}) { ${statements} }`;
};

export { forOfStatementToTargetLanguage };
