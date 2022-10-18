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
import { TRegularCase, TDefaultCase } from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

// simple case
const regularSwitchCaseToTargetLanguage = (
  variable: TRegularCase,
  targetLanguage: string,
): string => {
  if (!variable.caseValue) {
    throw new Error(`Invalid regular case: ${JSON.stringify(variable)}`);
  }
  const { statements, caseValue } = variable;

  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
    targetLanguage,
  });

  const regularCaseLangMapping: Record<string, (expression: string, statements: string) => string> =
    {
      [SupportedLanguages.TypeScript]: (caseExpression: string, statements: string) => {
        return `case ${caseExpression}: {${statements}}`;
      },
    };
  return regularCaseLangMapping[targetLanguage](caseValue, statementsString);
};

//default case
const defaultSwitchCaseToTargetLanguage = (
  variable: TDefaultCase,
  targetLanguage: string,
): string => {
  if (!variable) {
    throw new Error(`Invalid default case: ${variable}`);
  }
  const { statements } = variable;

  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
    targetLanguage,
  });

  const defaultCaseLangMapping: Record<string, (statements: string) => string> = {
    [SupportedLanguages.TypeScript]: (statements: string) => {
      return `default: {${statements}}`;
    },
  };
  return defaultCaseLangMapping[targetLanguage](statementsString);
};

export { defaultSwitchCaseToTargetLanguage, regularSwitchCaseToTargetLanguage };
