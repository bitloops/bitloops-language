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

const switchRegularCasesToTargetLanguage = (
  variable: TRegularCase[],
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  const switchCases = variable.map((switchCase: TRegularCase) => {
    const model = modelToTargetLanguage({
      type: BitloopsTypesMapping.TRegularCase,
      value: switchCase,
    });
    dependencies = [...dependencies, ...model.dependencies];
    return model.output;
  });

  const switchRegularCasesLangMapping = (switchCases: string[]): string => switchCases.join(' ');
  return {
    output: switchRegularCasesLangMapping(switchCases),
    dependencies,
  };
};

const switchDefaultCaseToTargetLanguage = (
  variable: TDefaultCase,
): TTargetDependenciesTypeScript => {
  const defaultCase = modelToTargetLanguage({
    type: BitloopsTypesMapping.TDefaultCase,
    value: variable,
  });
  return {
    output: defaultCase.output,
    dependencies: defaultCase.dependencies,
  };
};

export { switchRegularCasesToTargetLanguage, switchDefaultCaseToTargetLanguage };
