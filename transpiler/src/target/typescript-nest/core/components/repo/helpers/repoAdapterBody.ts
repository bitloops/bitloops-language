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
  TRepoPort,
  TTargetDependenciesTypeScript,
  repoPortKey,
  TRootEntity,
  TBitloopsPrimaryType,
  RootEntityKey,
  TProps,
  TReadModel,
  TRepoSupportedTypes,
} from '../../../../../../types.js';
import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../modelToTargetLanguage.js';
import { fetchAggregateCrudBaseRepo } from './mongo/aggregateCrudRepo.js';
import { fetchReadModelCrudBaseRepo } from './mongo/readModelCrudRepo.js';
import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { RootEntityDeclarationNode } from '../../../../../../ast/core/intermediate-ast/nodes/RootEntity/RootEntityDeclarationNode.js';
import { RepoPortTypeIdentifiers } from '../../../type-identifiers/repoPort.js';
import { ReadModelNode } from '../../../../../../ast/core/intermediate-ast/nodes/readModel/ReadModelNode.js';
import { PropsNode } from '../../../../../../ast/core/intermediate-ast/nodes/Props/PropsNode.js';
import { RepoPortNode } from '../../../../../../ast/core/intermediate-ast/nodes/repo-port/RepoPortNode.js';
import { RepoAdapterNode } from '../../../../../../ast/core/intermediate-ast/nodes/RepoAdapterNode.js';
import { repoExtendsCRUDReadRepo, repoExtendsCRUDWriteRepo } from './CRUDRepos.js';

const getPropsModel = (
  repoPort: TRepoPort,
  model: IntermediateASTTree,
): { output: TProps | TReadModel } => {
  let propsModel: TProps | TReadModel;
  if (RepoPortTypeIdentifiers.isAggregateRepoPort(repoPort)) {
    const { entityIdentifier } = repoPort[repoPortKey];
    const aggregateModels = model.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRootEntity,
    ) as RootEntityDeclarationNode[];
    const aggregateModelNode = aggregateModels.find(
      (node) => node.getClassName() === entityIdentifier,
    );
    const aggregateModel = aggregateModelNode.getValue() as TRootEntity;
    const aggregatePropsNameType = aggregateModel[RootEntityKey].entityValues.create.parameter.type;

    const typeValue: TBitloopsPrimaryType = {
      type: aggregatePropsNameType,
    };

    const { output: aggregatePropsName } = modelToTargetLanguage({
      type: BitloopsTypesMapping.TBitloopsPrimaryType,
      value: typeValue,
    });

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
  return { output: propsModel };
};

const repoBodyLangMapping = (
  dbType: TRepoSupportedTypes,
  repoPortNode: RepoPortNode,
  repoAdapterDefinition: RepoAdapterNode,
  model: IntermediateASTTree,
): TTargetDependenciesTypeScript => {
  const repoPortInfo = repoPortNode.getValue() as TRepoPort;
  const { output: propsModel } = getPropsModel(repoPortInfo, model);

  const repoAdapterExpression = repoAdapterDefinition.getExpression();
  const repoAdapterOptions = repoAdapterExpression.getOptions();
  const evaluationFields = repoAdapterOptions.getEvaluationFieldList();
  const connectionInfoOptions = repoAdapterExpression.getConnectionInfo().getOptions();

  const collectionExpression = evaluationFields
    .findFieldWithName('collection')
    .getValue().evaluationField;
  const connectionExpression = evaluationFields
    .findFieldWithName('connection')
    .getValue().evaluationField;

  const database = connectionInfoOptions
    .getEvaluationFieldList()
    .findFieldWithName('database')
    .getValue().evaluationField;

  const collection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: collectionExpression,
  });
  const connection = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: connectionExpression,
  });

  const dbName = modelToTargetLanguage({
    type: BitloopsTypesMapping.TExpression,
    value: database,
  });

  let dependencies = [
    ...collection.dependencies,
    ...connection.dependencies,
    ...dbName.dependencies,
  ];

  let result = '';
  switch (dbType) {
    case 'DB.Mongo': {
      result = `constructor(private client: Mongo.Client) { 
        const dbName = ${dbName.output};
      const collection = ${collection.output};
      this.collection = this.client.db(dbName).collection(collection);
     }`;
      if (repoExtendsCRUDWriteRepo(repoPortInfo)) {
        const methodsResult = fetchAggregateCrudBaseRepo(
          repoPortInfo[repoPortKey].entityIdentifier,
          propsModel as TProps,
          model,
        );
        result += methodsResult.output;
        dependencies = [...dependencies, ...methodsResult.dependencies];
      } else if (repoExtendsCRUDReadRepo(repoPortInfo)) {
        const methodsResult = fetchReadModelCrudBaseRepo(
          repoPortInfo[repoPortKey].readModelIdentifier,
          propsModel,
          model,
        );
        result += methodsResult.output;
        dependencies = [...dependencies, ...methodsResult.dependencies];
      }
      break;
    }
    default: {
      throw new Error(`Unsupported db type: ${database}`);
    }
  }
  return {
    output: result,
    dependencies,
  };
};
export { repoBodyLangMapping };