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

import { TIfStatement, TTargetDependenciesTypeScript } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const ifStatementToTargetLanguage = (variable: TIfStatement): TTargetDependenciesTypeScript => {
  const { condition, thenStatements, elseStatements } = variable.ifStatement;

  const conditionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: condition,
  });

  const thenStatementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: thenStatements.statements,
  });
  let elseStatementsResult;

  if (elseStatements) {
    elseStatementsResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: elseStatements.statements,
    });
  }

  const ifStatementLangMapping = (
    condition: TTargetDependenciesTypeScript,
    thenStatements: TTargetDependenciesTypeScript,
    elseStatements: TTargetDependenciesTypeScript | undefined,
  ): TTargetDependenciesTypeScript => {
    let res = `if (${condition.output}) { ${thenStatements.output} }`;
    if (elseStatements) {
      res += ` else { ${elseStatements.output} }`;
    }
    return {
      output: res,
      dependencies: [
        ...condition.dependencies,
        ...thenStatements.dependencies,
        ...(elseStatements?.dependencies || []),
      ],
    };
  };

  return ifStatementLangMapping(conditionResult, thenStatementsResult, elseStatementsResult);
};

export { ifStatementToTargetLanguage };
