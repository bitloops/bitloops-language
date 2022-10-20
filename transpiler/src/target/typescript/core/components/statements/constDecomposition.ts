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

import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TConstDecomposition, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const constDecompositionToTargetLanguage = (
  variable: TConstDecomposition,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  if (!variable.constDecomposition) {
    throw new Error('ConstDecomposition statement must have a constDecomposition value');
  }

  const { evaluation } = variable.constDecomposition;
  const expressionValue = modelToTargetLanguage({
    type: BitloopsTypesMapping.TEvaluation,
    value: {
      evaluation,
    },
  });
  const propsVariableLangMapping: any = {
    [SupportedLanguages.TypeScript]: (names: string[], expressionValue: string) =>
      `const { ${names.join(', ')} } = ${expressionValue}`,
  };
  const { names } = variable.constDecomposition;
  return propsVariableLangMapping[targetLanguage](names, expressionValue);
};

export { constDecompositionToTargetLanguage };
