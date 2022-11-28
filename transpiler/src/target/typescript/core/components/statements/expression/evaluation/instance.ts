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
  TExpression,
  TInstanceOf,
  TNotInstanceOf,
  TTargetDependenciesTypeScript,
} from '../../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';

type InstanceType = {
  class: string;
};

const classMappings = {
  Error: 'isFail()',
};

const instancesLangMapping = (instance: InstanceType): string => {
  if (classMappings[instance.class]) {
    return `.${classMappings[instance.class]}`;
  } else {
    return ` instanceof ${instance.class}`;
  }
};

const getInstanceResult = (
  expression: TExpression,
  instance: InstanceType,
): TTargetDependenciesTypeScript => {
  const argumentDependencyResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: expression,
  });

  const instanceResult = instancesLangMapping(instance);

  return {
    output: `${argumentDependencyResult.output}${instanceResult}`,
    dependencies: argumentDependencyResult.dependencies,
  };
};

const instanceOfToTargetLanguage = (variable: TInstanceOf): TTargetDependenciesTypeScript => {
  const { class: classInstance, expression } = variable.isInstanceOf;
  // const [value, instance] = variable.isInstanceOf;

  return getInstanceResult({ expression }, { class: classInstance });
};

const notInstanceOfToTargetLanguage = (variable: TNotInstanceOf): TTargetDependenciesTypeScript => {
  const { expression, class: instanceClass } = variable.isNotInstanceOf;

  const instanceResult = getInstanceResult({ expression }, { class: instanceClass });

  return { output: `!(${instanceResult.output})`, dependencies: instanceResult.dependencies };
};

export { instanceOfToTargetLanguage, notInstanceOfToTargetLanguage };
