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
  TBoundedContexts,
  TDependenciesTypeScript,
  TRepoAdapters,
  TRepoSupportedTypes,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { ClassTypes } from '../../../../../helpers/mappings.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';

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
  repoAdapters: TRepoAdapters,
  contextData: { boundedContext: string; module: string },
  model: TBoundedContexts,
): TTargetDependenciesTypeScript => {
  const { boundedContext, module: moduleName } = contextData;

  const repoAdapterInstanceName = Object.keys(repoAdapters)[0];
  const repoAdapter = repoAdapters[repoAdapterInstanceName];

  const { dbType, repoPort, connection: _connection, collection } = repoAdapter;
  // TODO Get db name from connection of this repoAdapter

  const repoPortInfo = model[boundedContext][moduleName].RepoPorts[repoPort];
  if (!repoPortInfo) {
    throw new Error(`Repo port ${repoPort} not found in model!`);
  }

  let dependencies = getDbTypeImports(dbType);

  const repoStart = getRepoHeader(repoPort, dbType);

  const { aggregateRootName } = repoPortInfo;
  const aggregateModel = model[boundedContext][moduleName].RootEntities[aggregateRootName];
  const aggregatePropsName = aggregateModel.create.parameterDependency.type;
  const propsModel = model[boundedContext][moduleName].Props[aggregatePropsName];
  const repoBody = repoBodyLangMapping(
    dbType,
    collection,
    repoPortInfo,
    propsModel,
    model[boundedContext][moduleName],
  );
  const repoEnd = '}';

  dependencies = [...dependencies, ...repoStart.dependencies, ...repoBody.dependencies];
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.RepoAdapters,
    className: repoAdapterInstanceName,
  });
  return {
    output: repoStart.output + repoBody.output + repoEnd,
    dependencies: parentDependencies,
  };
};
