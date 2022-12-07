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
// More specifically the code generation algorithm will identify all the Entities
// belonging to the Aggregate, and create all the CRUD methods with the respective data types.
import {
  TTargetDependenciesTypeScript,
  TContextData,
  TBitloopsPrimaryType,
} from '../../../../../../../types.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';

export const findIdOfRepoDomainObject = (
  repoDependencyName: string,
  bitloopsModel: IntermediateASTTree,
  type: TClassTypesValues,
  context: TContextData,
): TTargetDependenciesTypeScript => {
  const { boundedContext, module } = context;
  if (type === ClassTypes.RootEntities) {
    const aggregate = bitloopsModel[boundedContext][module][type][repoDependencyName];
    if (!aggregate) {
      throw new Error(`${type} ${repoDependencyName} not found`);
    }
    const aggregateProps = aggregate.create.parameter.type as string;
    const propsModel = bitloopsModel[boundedContext][module].Props[aggregateProps];
    if (!propsModel) {
      throw new Error(`Props ${aggregateProps} not found`);
    }
    const idProp = propsModel.variables.find((prop) => prop.name === 'id');
    const idType: TBitloopsPrimaryType = idProp.type;
    const idTypeRes = modelToTargetLanguage({
      value: idType,
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
    });
    return idTypeRes;
  } else if (type === ClassTypes.ReadModel) {
    const readModel = bitloopsModel[boundedContext][module][type][repoDependencyName];
    if (!readModel) {
      throw new Error(`${type} ${repoDependencyName} not found`);
    }

    const idProp = readModel.variables.find((prop) => prop.name === 'id');
    const idType: TBitloopsPrimaryType = idProp.type;
    const idTypeRes = modelToTargetLanguage({
      value: idType,
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
    });
    return idTypeRes;
  }
  throw new Error(`Unsupported type ${type}`);
};
