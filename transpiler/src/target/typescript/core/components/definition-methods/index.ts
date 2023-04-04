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

import { TDefinitionMethodInfo, TTargetDependenciesTypeScript } from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { hasDefinitionMethodOkErrorReturnType } from '../../../../../helpers/typeGuards.js';

export const definitionMethodInfoToTargetLanguage = (
  value: TDefinitionMethodInfo,
): TTargetDependenciesTypeScript => {
  const paramModel = modelToTargetLanguage({
    type: BitloopsTypesMapping.TParameterList,
    value: { parameters: value.methodDefinition.parameters },
  });
  return paramModel;
};

export const definitionMethodsToTargetLanguage = (
  methodDefinitionList: TDefinitionMethodInfo[],
): TTargetDependenciesTypeScript => {
  let res = '';
  let dependencies = [];
  for (const method of methodDefinitionList) {
    const { methodDefinition } = method;
    const definitionMethodInfo = definitionMethodInfoToTargetLanguage(method);
    res += `${methodDefinition.identifier}${definitionMethodInfo.output}`;
    let returnType;
    let returnTypeOutput;
    if (hasDefinitionMethodOkErrorReturnType(methodDefinition)) {
      returnType = modelToTargetLanguage({
        type: BitloopsTypesMapping.TOkErrorReturnType,
        value: { returnType: methodDefinition.returnType },
      });
      returnTypeOutput = `Promise<${returnType.output}>`;
    } else {
      returnType = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type: methodDefinition.type },
      });
      returnTypeOutput = returnType.output;
    }
    res += ':';
    res += returnTypeOutput;
    dependencies = [
      ...dependencies,
      ...returnType.dependencies,
      ...definitionMethodInfo.dependencies,
    ];
    res += ';';
  }
  return { output: res, dependencies };
};
