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
  TRegularCase,
  TDefaultCase,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

// simple case
const regularSwitchCaseToTargetLanguage = (
  variable: TRegularCase,
): TTargetDependenciesTypeScript => {
  if (!variable.regularCase.expression) {
    throw new Error(`Invalid regular case: ${JSON.stringify(variable)}`);
  }
  const { statements, expression } = variable.regularCase;

  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const caseValueExpression = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpressionValues,
    value: expression,
  });

  return {
    output: `case ${caseValueExpression.output}: {${statementsString.output}}`,
    dependencies: [...caseValueExpression.dependencies, ...statementsString.dependencies],
  };
};

//default case
const defaultSwitchCaseToTargetLanguage = (
  variable: TDefaultCase,
): TTargetDependenciesTypeScript => {
  if (!variable) {
    throw new Error(`Invalid default case: ${variable.statements}`);
  }
  const { statements } = variable;

  const statementsString = modelToTargetLanguage({
    type: BitloopsTypesMapping.TStatements,
    value: statements,
  });

  const defaultCaseLangMapping = (statements: string): string => {
    return `default: {${statements}}`;
  };
  return {
    output: defaultCaseLangMapping(statementsString.output),
    dependencies: statementsString.dependencies,
  };
};

export { defaultSwitchCaseToTargetLanguage, regularSwitchCaseToTargetLanguage };
