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
import { TTargetDependenciesTypeScript } from '../../../../../../../types.js';
import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../modelToTargetLanguage.js';
import { IntermediateASTTree } from '../../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { RootEntityDeclarationNode } from '../../../../../../../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';

export const findIdOfRepoDomainObject = (
  repoDependencyName: string,
  ast: IntermediateASTTree,
  type: TClassTypesValues,
): TTargetDependenciesTypeScript | void => {
  if (type === ClassTypes.RootEntity) {
    const rootEntityNode = ast.getAggregateNodeWithIdentifier(
      repoDependencyName,
    ) as RootEntityDeclarationNode;
    if (!rootEntityNode) {
      throw new Error(`${type} ${repoDependencyName} not found`);
    }

    const aggregatePropsNode = ast.getPropsFromEntity(rootEntityNode);

    if (!aggregatePropsNode) {
      const aggregateNodeIdentifier = rootEntityNode.getIdentifier().getValue();
      throw new Error(`Props for aggregate ${aggregateNodeIdentifier} not found`);
    }

    const propsValue = ast.getValueOfPropsWithIdentifierFromDomainCreate(aggregatePropsNode, 'id');

    const idTypeRes = modelToTargetLanguage({
      value: propsValue,
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
    });
    return idTypeRes;
  } else if (type === ClassTypes.ReadModel) {
    return;
  }
  throw new Error(`Unsupported type ${type}`);
};
