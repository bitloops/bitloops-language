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

import { SupportedLanguages } from '../../../../../../helpers/supportedLanguages.js';
import { TIfStatement } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const ifStatementToTargetLanguage = (variable: TIfStatement, targetLanguage: string): string => {
  const { condition, thenStatements, elseStatements } = variable.ifStatement;

  const conditionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: condition,
    targetLanguage,
  });

  const thenStatementsResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: thenStatements,
    targetLanguage,
  });
  let elseStatementsResult;

  if (elseStatements) {
    elseStatementsResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TStatements,
      value: elseStatements,
      targetLanguage,
    });
  }

  const ifStatementLangMapping: any = {
    [SupportedLanguages.TypeScript]: (
      condition: string,
      thenStatements: string,
      elseStatements: string | undefined,
    ): string => {
      let res = `if (${condition}) { ${thenStatements} }`;
      if (elseStatements) {
        res += ` else { ${elseStatements} }`;
      }
      return res;
    },
  };

  return ifStatementLangMapping[targetLanguage](
    conditionResult,
    thenStatementsResult,
    elseStatementsResult,
  );
};

export { ifStatementToTargetLanguage };
