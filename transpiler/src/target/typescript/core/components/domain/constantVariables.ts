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
import { TConstantVariable, TTargetDependenciesTypeScript } from '../../../../../types.js';

const NEW_LINE = '\n';

const constantVariables = (
  constantVariables: TConstantVariable[],
): TTargetDependenciesTypeScript => {
  const constVariablesLangMapping = (variable: TConstantVariable): string => {
    const { name, type, value } = variable;
    if (type) {
      return `const ${name}: ${type} = ${value};`;
    } else {
      return `const ${name} = ${value};`;
    }
  };

  let constDeclarationResult = '';

  for (const variable of constantVariables) {
    const constDeclaration = constVariablesLangMapping(variable);
    constDeclarationResult += `${constDeclaration}${NEW_LINE}`;
  }

  return { output: constDeclarationResult, dependencies: [] };
};
export { constantVariables };
