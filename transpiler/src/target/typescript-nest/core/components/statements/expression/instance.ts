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
  bitloopsIdentifiersTypeKey,
  bitloopsPrimaryTypeKey,
  TBitloopsPrimaryType,
  TExpression,
  TInstanceOf,
  TTargetDependenciesTypeScript,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../../../type-identifiers/bitloopsPrimType.js';

const classMappings = {
  Error: 'isFail()',
};

const instancesLangMapping = (
  classInstance: TBitloopsPrimaryType,
): TTargetDependenciesTypeScript => {
  const primaryTypeValue = classInstance[bitloopsPrimaryTypeKey];
  if (BitloopsPrimTypeIdentifiers.isBitloopsIdentifierType(primaryTypeValue)) {
    const mappedType = primaryTypeValue[bitloopsIdentifiersTypeKey];
    if (classMappings[mappedType]) {
      return { output: `.${classMappings[mappedType]}`, dependencies: [] };
    }
  }

  const bitloopsPrimaryTypeResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TBitloopsPrimaryType,
    value: classInstance,
  });
  return {
    output: ` instanceof ${bitloopsPrimaryTypeResult.output}`,
    dependencies: bitloopsPrimaryTypeResult.dependencies,
  };
};

const getInstanceResult = (
  expression: TExpression,
  classInstance: TBitloopsPrimaryType,
): TTargetDependenciesTypeScript => {
  const expressionResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: expression,
  });

  const instanceResult = instancesLangMapping(classInstance);

  const dependencies = [...expressionResult.dependencies, ...instanceResult.dependencies];
  return {
    output: `${expressionResult.output}${instanceResult.output}`,
    dependencies,
  };
};

const instanceOfToTargetLanguage = (variable: TInstanceOf): TTargetDependenciesTypeScript => {
  const { class: classInstance, expression } = variable.isInstanceOf;

  return getInstanceResult({ expression }, classInstance);
};

export { instanceOfToTargetLanguage };
