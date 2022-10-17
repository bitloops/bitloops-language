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
import { SupportedLanguages } from '../../../../../helpers/supportedLanguages.js';
import { TArgumentDependency, TInstanceOf, TNotInstanceOf } from '../../../../../types.js';
import { modelToTargetLanguage } from '../../../index.js';
import { BitloopsTypesMapping } from '../../../commons/index.js';

type InstanceType = {
  class: string;
};

const classMappings = {
  Error: 'isOops()',
};

const instancesLangMapping: any = {
  [SupportedLanguages.TypeScript]: (instance: InstanceType): string => {
    if (classMappings[instance.class]) {
      return `.${classMappings[instance.class]}`;
    } else {
      return ` instanceof ${instance.class}`;
    }
  },
};

const getInstanceResult = (
  value: TArgumentDependency,
  instance: InstanceType,
  targetLanguage: string,
): string => {
  const argumentDependencyResult = modelToTargetLanguage({
    type: BitloopsTypesMapping.TArgumentDependency,
    value,
    targetLanguage,
  });

  const instanceResult = instancesLangMapping[targetLanguage](instance);

  return `${argumentDependencyResult}${instanceResult}`;
};

const instanceOfToTargetLanguage = (variable: TInstanceOf, targetLanguage: string): string => {
  const [value, instance] = variable.isInstanceOf;

  return getInstanceResult(value, instance, targetLanguage);
};

const notInstanceOfToTargetLanguage = (
  variable: TNotInstanceOf,
  targetLanguage: string,
): string => {
  const [value, instance] = variable.isNotInstanceOf;

  const instanceResult = getInstanceResult(value, instance, targetLanguage);

  return `!(${instanceResult})`;
};

export { instanceOfToTargetLanguage, notInstanceOfToTargetLanguage };
