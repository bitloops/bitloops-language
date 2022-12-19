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
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  TConstDeclaration,
  TTargetDependenciesTypeScript,
  constDeclarationKey,
} from '../../../../../types.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const NEW_LINE = '\n';

const constVariablesToTarget = (variable: TConstDeclaration): TTargetDependenciesTypeScript => {
  const { identifier, type } = variable[constDeclarationKey];
  const expression = variable[constDeclarationKey].expression;
  const value = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: { expression },
  });
  if (type) {
    const typeResult = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: type,
    });
    return {
      output: `const ${identifier}: ${typeResult.output} = ${value.output};`,
      dependencies: [...typeResult.dependencies, ...value.dependencies],
    };
  } else {
    return {
      output: `const ${identifier} = ${value.output};`,
      dependencies: value.dependencies,
    };
  }
};

const constantVariables = (
  constantVariables: TConstDeclaration[],
): TTargetDependenciesTypeScript => {
  let constDeclarationResult = '';
  const dependencies = [];

  for (const variable of constantVariables) {
    const constDeclaration = constVariablesToTarget(variable);
    constDeclarationResult += `${constDeclaration.output}${NEW_LINE}`;
    dependencies.push(...constDeclaration.dependencies);
  }

  return { output: constDeclarationResult, dependencies };
};
export { constantVariables };
