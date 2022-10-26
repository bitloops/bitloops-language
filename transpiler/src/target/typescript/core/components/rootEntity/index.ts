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
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import {
  TBoundedContexts,
  TContextData,
  TRootEntities,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

export const rootEntitiesToTargetLanguage = (params: {
  rootEntities: TRootEntities;
  model: TBoundedContexts;
  contextData: TContextData;
}): TTargetDependenciesTypeScript => {
  const { rootEntities, model, contextData } = params;
  let res = '';
  let dependencies = [];
  for (const [rootEntityName, rootEntity] of Object.entries(rootEntities)) {
    const { create } = rootEntity;
    const propsName = create.parameterDependency.type;
    res += `export class ${rootEntityName} extends Domain.Aggregate<${propsName}>`;
    const values = modelToTargetLanguage({
      type: BitloopsTypesMapping.TEntityValues,
      value: rootEntity,
      model,
      contextData,
    });
    dependencies = [...dependencies, ...values.dependencies];
    res += values.output;
  }

  return { output: res, dependencies };
};
