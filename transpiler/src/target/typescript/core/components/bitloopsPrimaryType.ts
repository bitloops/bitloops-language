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
import {
  BitloopsTypesMapping,
  mappingBitloopsBuiltInClassToLayer,
} from '../../../../helpers/mappings.js';
import {
  bitloopsIdentifiersTypeKey,
  bitloopsPrimaryTypeKey,
  TBitloopsPrimaryType,
  TContextData,
  TDependenciesTypeScript,
  TStandardValueType,
  TTargetDependenciesTypeScript,
} from '../../../../types.js';
import { SupportedLanguages } from '../../../supportedLanguages.js';
import { getChildDependencies } from '../dependencies.js';
import { modelToTargetLanguage } from '../modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../type-identifiers/bitloopsPrimType.js';

export const bitloopsPrimaryTypeToTargetLanguage = (
  type: TBitloopsPrimaryType,
  contextData: TContextData,
): TTargetDependenciesTypeScript => {
  let dependencies = [];
  let mappedType: string;
  const primaryTypeValue = type[bitloopsPrimaryTypeKey];

  if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(primaryTypeValue)) {
    const { primitiveType } = primaryTypeValue;
    mappedType = bitloopsTypeToLangMapping[SupportedLanguages.TypeScript](primitiveType);
  } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(primaryTypeValue)) {
    const { buildInClassType } = primaryTypeValue;
    mappedType = `${mappingBitloopsBuiltInClassToLayer[buildInClassType]}.${buildInClassType}`;
    dependencies = getChildDependencies(buildInClassType);
  } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(primaryTypeValue)) {
    const value = primaryTypeValue.arrayPrimaryType;
    const arrayPrimType = bitloopsPrimaryTypeToTargetLanguage({ type: value }, contextData);
    const { output, dependencies: arrayPrimTypeDependencies } = arrayPrimType;
    mappedType = `${output}[]`;
    dependencies = [...dependencies, ...arrayPrimTypeDependencies];
  } else if (BitloopsPrimTypeIdentifiers.isBitloopsIdentifierType(primaryTypeValue)) {
    mappedType = primaryTypeValue[bitloopsIdentifiersTypeKey];
    // If not primitive, then we have a dependency
    // const baseType = extractBaseTypeOfPrimaryType(type);
    dependencies = getChildDependencies(mappedType, contextData);
  } else if (BitloopsPrimTypeIdentifiers.isStandardValueType(primaryTypeValue)) {
    return modelToTargetLanguage({
      type: BitloopsTypesMapping.TStandardValueType,
      value: primaryTypeValue,
    });
  } else {
    throw new Error(`Invalid primary type ${JSON.stringify(type)}`);
  }

  return {
    output: mappedType,
    dependencies,
  };
};

const STANDARD_VO_DEPENDENCIES: TDependenciesTypeScript = [
  {
    type: 'absolute',
    default: false,
    value: 'Domain',
    from: '@bitloops/bl-boilerplate-core',
  },
];

export const standardValueTypeToTargetLanguage = (
  type: TStandardValueType,
): TTargetDependenciesTypeScript => {
  const { standardVOType } = type.standardValueType;

  const dependencies = STANDARD_VO_DEPENDENCIES;
  const output = `Domain.StandardVO.${standardVOType}.Value`;
  return {
    output,
    dependencies,
  };
};
