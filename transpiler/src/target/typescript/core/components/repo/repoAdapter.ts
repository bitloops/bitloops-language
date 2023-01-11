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
  PropsIdentifierKey,
  repoPortKey,
  RootEntityKey,
  TDependenciesTypeScript,
  TProps,
  TReadModel,
  TRepoAdapter,
  TRepoPort,
  TRepoSupportedTypes,
  TRootEntity,
  TTargetDependenciesTypeScript,
} from '../../../../../types.js';
import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { repoBodyLangMapping } from './helpers/repoAdapterBody.js';
import { getRepoAdapterClassName } from './helpers/repoAdapterName.js';
import { getChildDependencies, getParentDependencies } from '../../dependencies.js';
import { RepoPortTypeIdentifiers } from '../../type-identifiers/repoPort.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { modelToTargetLanguage } from '../../modelToTargetLanguage.js';
import { RootEntityDeclarationNode } from '../../../../../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';
import { PropsNode } from '../../../../../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { ReadModelNode } from '../../../../../ast/core/intermediate-ast/nodes/readModel/ReadModel.js';
import { RepoPortNode } from '../../../../../ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';

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
  repoPort: TRepoPort,
  model: IntermediateASTTree,
): { output: TPropsValues; dependencies: TDependenciesTypeScript } => {
  let propsModel: TPropsValues;
  let dependencies = [];
  if (RepoPortTypeIdentifiers.isAggregateRepoPort(repoPort)) {
    const { entityIdentifier } = repoPort[repoPortKey];
    const aggregateModels = model.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRootEntity,
    ) as RootEntityDeclarationNode[];
    const aggregateModelNode = aggregateModels.find(
      (node) => node.getClassName() === entityIdentifier,
    );
    const aggregateModel = aggregateModelNode.getValue() as TRootEntity;
    const aggregatePropsNameType =
      aggregateModel[RootEntityKey].entityValues.create.domainCreateParameter[PropsIdentifierKey];

    const { output: aggregatePropsName, dependencies: aggregatePropsTypeDependencies } =
      modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type: aggregatePropsNameType },
      });
    dependencies = [...dependencies, ...aggregatePropsTypeDependencies];

    const propsModels = model.getRootChildrenNodesByType(
      BitloopsTypesMapping.TProps,
    ) as PropsNode[];
    const propsModelNode = propsModels.find((node) => node.getClassName() === aggregatePropsName);
    propsModel = propsModelNode.getValue() as TProps;
  } else if (RepoPortTypeIdentifiers.isReadModelRepoPort(repoPort)) {
    const { readModelIdentifier } = repoPort[repoPortKey];
    const readModels = model.getRootChildrenNodesByType(
      BitloopsTypesMapping.TReadModel,
    ) as ReadModelNode[];
    const readModelNode = readModels.find((node) => node.getClassName() === readModelIdentifier);
    const readModelValues = readModelNode.getValue() as TReadModel;
    propsModel = readModelValues;
  } else {
    throw new Error(`Invalid repo port ${JSON.stringify(repoPort)}`);
  }
  return { output: propsModel, dependencies };
};

export const repoAdapterToTargetLanguage = (
  repoAdapters: TRepoAdapter,
  contextData: { boundedContext: string; module: string },
  model: IntermediateASTTree,
  setupData: any,
): TTargetDependenciesTypeScript => {
  const { boundedContext, module: moduleName } = contextData;

  const repoAdapterInstanceName = Object.keys(repoAdapters)[0];
  const repoAdapter = repoAdapters[repoAdapterInstanceName];

  const { dbType, repoPort, connection, collection } = repoAdapter;

  const repoPorts = model.getRootChildrenNodesByType(
    BitloopsTypesMapping.TRepoPort,
  ) as RepoPortNode[];
  const repoPortNode = repoPorts.find((node) => node.getClassName() === repoPort);
  if (!repoPortNode) {
    throw new Error(`Repo port ${repoPort} not found in model!`);
  }
  const repoPortInfo = repoPortNode.getValue() as TRepoPort;

  let dependencies = getDbTypeImports(dbType);

  const repoStart = getRepoHeader(repoPort, dbType);

  const { output: propsModel, dependencies: propsDependencies } = getPropsModel(
    repoPortInfo,
    model,
  );

  // TODO fix, remove this and use tree
  const module = model[boundedContext][moduleName];
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
    classType: ClassTypes.RepoAdapter,
    className: repoAdapterInstanceName,
  });
  return {
    output: repoStart.output + repoBody.output + repoEnd,
    dependencies: parentDependencies,
  };
};
