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
import { bitloopsTypeToLangMapping } from '../../../../helpers/bitloopsPrimitiveToLang.js';
import { mappingBitloopsBuiltInClassToLayer } from '../../../../helpers/mappings.js';
import {
  bitloopsIdentifiersTypeKey,
  TBitloopsPrimaryType,
  TTargetDependenciesTypeScript,
} from '../../../../types.js';
import { SupportedLanguages } from '../../../supportedLanguages.js';
import { getChildDependencies } from '../dependencies.js';
import { BitloopsPrimTypeIdentifiers } from '../type-identifiers/bitloopsPrimType.js';

export const bitloopsPrimaryTypeToTargetLanguage = (
  type: TBitloopsPrimaryType,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  let mappedType: string;

  if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
    const { primitiveType } = type;
    mappedType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](primitiveType);
  } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
    const { buildInClassType } = type;
    mappedType = `${mappingBitloopsBuiltInClassToLayer[buildInClassType]}.${buildInClassType}`;
    dependencies = getChildDependencies(buildInClassType);
  } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
    const value = type.arrayPrimaryType;
    const arrayPrimType = bitloopsPrimaryTypeToTargetLanguage(value);
    const { output, dependencies: arrayPrimTypeDependencies } = arrayPrimType;
    mappedType = `${output}[]`;
    dependencies = [...dependencies, ...arrayPrimTypeDependencies];
  } else if (BitloopsPrimTypeIdentifiers.isBitloopsIdentifierType(type)) {
    mappedType = type[bitloopsIdentifiersTypeKey];
    // If not primitive, then we have a dependency
    // const baseType = extractBaseTypeOfPrimaryType(type);
    dependencies = getChildDependencies(mappedType);
  } else {
    throw new Error(`Invalid primary type ${type}`);
  }

  return {
    output: mappedType,
    dependencies,
  };
};
