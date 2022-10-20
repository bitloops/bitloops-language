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
import {
  TRegularCase,
  TDefaultCase,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';

const switchRegularCasesToTargetLanguage = (
  variable: TRegularCase[],
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const switchCases = variable.map((switchCase: TRegularCase) => {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TRegularCase,
      value: switchCase,
      targetLanguage,
    }).output;
  });

  const switchRegularCasesLangMapping: Record<string, (cases: string[]) => string> = {
    [SupportedLanguages.TypeScript]: (switchCases: string[]) => switchCases.join(' '),
  };
  return {
    output: switchRegularCasesLangMapping[targetLanguage](switchCases),
    dependencies: [],
  };
};

const switchDefaultCaseToTargetLanguage = (
  variable: TDefaultCase,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const defaultCase = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDefaultCase,
    value: variable,
    targetLanguage,
  });

  const switchDefaultCaseLangMapping: Record<string, (defaultCase: string) => string> = {
    [SupportedLanguages.TypeScript]: (defaultCase: string) => defaultCase,
  };
  return {
    output: switchDefaultCaseLangMapping[targetLanguage](defaultCase.output),
    dependencies: defaultCase.dependencies,
  };
};

export { switchRegularCasesToTargetLanguage, switchDefaultCaseToTargetLanguage };
