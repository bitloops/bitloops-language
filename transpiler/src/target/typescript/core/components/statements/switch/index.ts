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
import { TSwitchStatement, TRegularCase, TDefaultCase } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { switchRegularCasesToTargetLanguage, switchDefaultCaseToTargetLanguage } from './cases.js';

const switchStatementToTargetLanguage = (
  variable: TSwitchStatement,
  targetLanguage: string,
): string => {
  if (!variable.switchStatement) {
    throw new Error(`Invalid switch statement: ${variable}`);
  }
  const { expression, cases, defaultCase } = variable.switchStatement;
  const expressionStr = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: expression,
    targetLanguage,
  });
  const switchStatementLangMapping: Record<
    string,
    (expression: string, cases: TRegularCase[], defaultCase: TDefaultCase) => string
  > = {
    [SupportedLanguages.TypeScript]: (
      expression: string,
      cases: TRegularCase[],
      defaultCase: TDefaultCase,
    ) => {
      return `switch(${expression}) {${switchRegularCasesToTargetLanguage(
        cases,
        targetLanguage,
      )} ${switchDefaultCaseToTargetLanguage(defaultCase, targetLanguage)}}`;
    },
  };
  return switchStatementLangMapping[targetLanguage](expressionStr, cases, defaultCase);
};

export { switchStatementToTargetLanguage };
