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

import { bitloopsTypeToLangMapping } from '../../../../../helpers/bitloopsPrimitiveToLang.js';
import { isBitloopsPrimitive } from '../../../../../helpers/isBitloopsPrimitive.js';
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TTargetDependenciesTypeScript, TVariableDeclaration } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const variableDeclarationToTargetLanguage = (
  variable: TVariableDeclaration,
): TTargetDependenciesTypeScript => {
  const constDeclarationLangMapping = (variable: TVariableDeclaration): string => {
    const { name, type } = variable.variableDeclaration;
    let tsType = type;
    if (isBitloopsPrimitive(type)) {
      tsType = `${bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](type)}`;
    }
    return `let ${name}: ${tsType} = `;
  };

  const declareResult = constDeclarationLangMapping(variable);

  const { expression } = variable.variableDeclaration;
  const expressionModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: { expression },
  });

  return {
    output: `${declareResult}${expressionModel.output}`,
    dependencies: expressionModel.dependencies,
  };
};
