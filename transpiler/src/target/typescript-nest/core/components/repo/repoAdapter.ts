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
  TDependenciesTypeScript,
  TRepoSupportedTypes,
  TTargetDependenciesTypeScript,
  TRepoAdapter,
} from '../../../../../types.js';
import { ClassTypes } from '../../../../../helpers/mappings.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { findRepoAdapterAndRepoPort as findRepoAdapterAndRepoPortNodes } from './helpers/guards.js';

const getDbTypeImports = (dbType: TRepoSupportedTypes): TDependenciesTypeScript => {
  switch (dbType) {
    case 'DB.Mongo': {
      const dependencies: TDependenciesTypeScript = [
        {
          type: 'absolute',
          default: false,
          value: 'Mongo',
          from: '@bitloops/bl-boilerplate-infra-mongo',
        },
      ];
      return dependencies;
    }
    default:
      throw new Error(`Unsupported db type: ${dbType}`);
  }
};
const getRepoHeader = (
  repoPort: string,
  dbType: TRepoSupportedTypes,
): TTargetDependenciesTypeScript => {
  const str = `export class ${getRepoAdapterClassName(
    repoPort,
    dbType,
  )} implements ${repoPort} { private collection: Mongo.Collection;; `;
  const dependencies = getChildDependencies(repoPort);
  return {
    output: str,
    dependencies,
  };
};

export const repoAdapterToTargetLanguage = (
  repoAdapter: TRepoAdapter,
  model: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  const repoAdapterInstanceName = repoAdapter.repoAdapter.identifier;
  const repoAdapterExpression = repoAdapter.repoAdapter.repoAdapterExpression;
  const { dbType, concretedRepoPort } = repoAdapterExpression;

  const [nodesFound, error] = findRepoAdapterAndRepoPortNodes(
    model,
    concretedRepoPort,
    repoAdapterInstanceName,
  );
  if (error) {
    throw new Error(error);
  }
  const { repoAdapterNode, repoPortNode } = nodesFound;

  const dependencies = getDbTypeImports(dbType);

  const repoStart = getRepoHeader(concretedRepoPort, dbType);

  const repoBody = repoBodyLangMapping(dbType, repoPortNode, repoAdapterNode, model);
  const repoEnd = '}';

  dependencies.push(...repoStart.dependencies, ...repoBody.dependencies);
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.RepoAdapter,
    className: repoAdapterInstanceName,
  });
  return {
    output: repoStart.output + repoBody.output + repoEnd,
    dependencies: parentDependencies,
  };
};
