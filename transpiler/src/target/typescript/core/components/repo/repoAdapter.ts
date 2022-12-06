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
  ISetupData,
  TDependenciesTypeScript,
  TModule,
  TRepoAdapters,
  TRepoPort,
  TRepoSupportedTypes,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';
import { RepoPortTypeIdentifiers } from '../../type-identifiers/repoPort.js';
import { BitloopsPrimTypeIdentifiers } from '../../type-identifiers/bitloopsPrimType.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';

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

// TODO, TProps where deleted, fix this
type TPropsValues = any;
const getPropsModel = (
  repoPortInfo: TRepoPort,
  module: TModule,
): { output: TPropsValues; dependencies: TDependenciesTypeScript } => {
  let propsModel: TPropsValues;
  let dependencies = [];
  if (RepoPortTypeIdentifiers.isAggregateRepoPort(repoPortInfo)) {
    const { aggregateRootName } = repoPortInfo;
    const aggregateModel = module.RootEntities[aggregateRootName];
    const aggregatePropsNameType = aggregateModel.create.parameter.type;

    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(aggregatePropsNameType)) {
      throw new Error('Array props are not supported');
    }
    const { output: aggregatePropsName, dependencies: aggregatePropsTypeDependencies } =
      modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: aggregatePropsNameType,
      });
    dependencies = [...dependencies, ...aggregatePropsTypeDependencies];

    propsModel = module.Props[aggregatePropsName];
  } else if (RepoPortTypeIdentifiers.isReadModelRepoPort(repoPortInfo)) {
    const { readModelName } = repoPortInfo;
    const readModelValues = module.ReadModels[readModelName];
    propsModel = readModelValues;
  } else {
    throw new Error(`Invalid repo port ${JSON.stringify(repoPortInfo)}`);
  }
  return { output: propsModel, dependencies };
};

export const repoAdapterToTargetLanguage = (
  repoAdapters: TRepoAdapters,
  contextData: { boundedContext: string; module: string },
  model: IntermediateASTTree,
  setupData: ISetupData,
): TTargetDependenciesTypeScript => {
  const { boundedContext, module: moduleName } = contextData;

  const repoAdapterInstanceName = Object.keys(repoAdapters)[0];
  const repoAdapter = repoAdapters[repoAdapterInstanceName];

  const { dbType, repoPort, connection, collection } = repoAdapter;

  const module = model[boundedContext][moduleName];
  const repoPortInfo = module.RepoPorts[repoPort];
  if (!repoPortInfo) {
    throw new Error(`Repo port ${repoPort} not found in model!`);
  }

  let dependencies = getDbTypeImports(dbType);

  const repoStart = getRepoHeader(repoPort, dbType);

  const { output: propsModel, dependencies: propsDependencies } = getPropsModel(
    repoPortInfo,
    module,
  );

  const repoBody = repoBodyLangMapping(
    dbType,
    collection,
    connection,
    repoPortInfo,
    propsModel,
    module,
    setupData,
  );
  const repoEnd = '}';

  dependencies = [
    ...dependencies,
    ...repoStart.dependencies,
    ...repoBody.dependencies,
    ...propsDependencies,
  ];
  const parentDependencies = getParentDependencies(dependencies, {
    classType: ClassTypes.RepoAdapters,
    className: repoAdapterInstanceName,
  });
  return {
    output: repoStart.output + repoBody.output + repoEnd,
    dependencies: parentDependencies,
  };
};
