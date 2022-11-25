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
import { TConstDeclaration, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const constDeclarationToTargetLanguage = (
  variable: TConstDeclaration,
): TTargetDependenciesTypeScript => {
  const constDeclarationLangMapping = (
    variable: TConstDeclaration,
  ): TTargetDependenciesTypeScript => {
    const { name, type } = variable.constDeclaration;

    if (type) {
      const mappedType = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: type,
      });
      return {
        output: `const ${name}: ${mappedType.output} = `,
        dependencies: mappedType.dependencies,
      };
    } else {
      return { output: `const ${name} = `, dependencies: [] };
    }
  };

  const declareResult = constDeclarationLangMapping(variable);

  const { expression } = variable.constDeclaration;
  const expressionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: { expression },
  });

  return {
    output: `${declareResult.output}${expressionResult.output}`,
    dependencies: [...declareResult.dependencies, ...expressionResult.dependencies],
  };
};

export { constDeclarationToTargetLanguage };
