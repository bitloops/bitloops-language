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
import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import {
  TRepoPort,
  TTargetDependenciesTypeScript,
  // TContextData,
  repoPortKey,
  repoPortIdentifierKey,
} from '../../../../../../types.js';
import { findIdOfRepoDomainObject } from './helpers/domainIDofRepoPort.js';
import { findIfWriteOrReadRepoPort } from './helpers/mappers.js';
import { noMethodsRepoPort } from './helpers/noMethodsPort.js';
import { buildRepoPortWithMethods } from './helpers/withMethodsPort.js';

export const repoPortToTargetLanguage = (
  repoPort: TRepoPort,
  bitloopsModel: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  const repoPortValues = repoPort[repoPortKey];
  const repoPortName = repoPort[repoPortKey][repoPortIdentifierKey];

  const { methodDefinitionList: definitionMethods } = repoPortValues;

  const { repoDependencyName, type } = findIfWriteOrReadRepoPort(repoPort);

  //TODO check here what should be done in read models
  const domainObjectIdType = findIdOfRepoDomainObject(repoDependencyName, bitloopsModel, type) || {
    output: '',
    dependencies: [],
  };

  if (!definitionMethods || Object.keys(definitionMethods).length === 0) {
    return noMethodsRepoPort(repoPortName, repoDependencyName, repoPort, domainObjectIdType);
  }
  return buildRepoPortWithMethods(repoPortName, repoDependencyName, repoPort, domainObjectIdType);
};
