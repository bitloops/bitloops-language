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
import { getChildDependencies } from '../../dependencies.js';

const NEW_LINE = '\n';

const constantVariables = (
  constantVariables: TConstantVariable[],
): TTargetDependenciesTypeScript => {
  const constVariablesLangMapping = (
    variable: TConstantVariable,
  ): TTargetDependenciesTypeScript => {
    const { name, type, value } = variable;
    if (type) {
      return {
        output: `const ${name}: ${type} = ${value};`,
        dependencies: getChildDependencies(type),
      };
    } else {
      return {
        output: `const ${name} = ${value};`,
        dependencies: [],
      };
    }
  };

  let constDeclarationResult = '';
  const dependencies = [];

  for (const variable of constantVariables) {
    const constDeclaration = constVariablesLangMapping(variable);
    constDeclarationResult += `${constDeclaration.output}${NEW_LINE}`;
    dependencies.push(...constDeclaration.dependencies);
  }

  return { output: constDeclarationResult, dependencies };
};
export { constantVariables };
