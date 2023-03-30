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
import { TBitloopsPrimaryType, TParameter } from '../../../../../types.js';
import { getChildDependencies } from '../../dependencies.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

const getTokenName = (dependency: string) => `${dependency}Token`;

export const createHandlerConstructor = (parameters: TParameter[]): string => {
  let constructorParameters = '';
  const dependencies = [];
  for (const parameter of parameters) {
    const { value: identifier, type } = parameter.parameter;
    const primaryType: TBitloopsPrimaryType = { type };

    const mappedType = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: type,
    });
    const token = getTokenName(identifier);
    const tokenDepndency = getChildDependencies(token);
    constructorParameters += `@Inject(${token})\n${identifier}: ${mappedType.output}, `;
    dependencies.push(...tokenDepndency, ...mappedType.dependencies);
  }
  result += ` constructor${dependencies} {} `;
  return result;
};
