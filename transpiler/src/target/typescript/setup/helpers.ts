import { IntermediateASTTree } from '../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import {
  expressionKey,
  TDependencyInjections,
  TEvaluationField,
  TEvaluationFields,
  TExpression,
  TGraphQLServerInstance,
  TRouterDefinition,
  TSetupRepoAdapterDefinition,
  TUseCaseDefinition,
} from '../../../types.js';
import { ControllerHelpers } from './controller/index.js';
import { TSetupElementsPerModule } from './definitions.js';
import { DependencyInjectionHelpers } from './dependency-injections/helpers.js';
import { SetupTypeScriptRepos } from './repos/index.js';
import { UseCaseDefinitionHelpers } from './useCaseDefinition/index.js';

export class NodeValueHelpers {
  static findKeyOfEvaluationFieldList(list: TEvaluationFields, key: string): TExpression {
    const result = list.fields.find(({ evaluationField }) => evaluationField.identifier === key);
    if (!result) throw new Error('Key not found in evaluation field list: ' + key);
    const expression = result.evaluationField[expressionKey];
    return { expression };
  }

  static findKeyOfEvaluationFields(list: TEvaluationField[], key: string): TExpression {
    const result = list.find(({ evaluationField }) => evaluationField.identifier === key);
    if (!result) throw new Error('Key not found in evaluation field list: ' + key);
    const expression = result.evaluationField[expressionKey];
    return { expression };
  }
}

export const groupSetupElementsPerModule = (
  setupTree: IntermediateASTTree,
): TSetupElementsPerModule => {
  const routerDefinitions = setupTree.getRootChildrenNodesValueByType<TRouterDefinition>(
    BitloopsTypesMapping.TRouterDefinition,
  );
  const graphQLServerInstances = setupTree.getRootChildrenNodesValueByType<TGraphQLServerInstance>(
    BitloopsTypesMapping.TGraphQLServerInstance,
  );
  const useCaseDefinitions = setupTree.getRootChildrenNodesValueByType<TUseCaseDefinition>(
    BitloopsTypesMapping.TUseCaseDefinition,
  );
  const repoAdapterDefinitions =
    setupTree.getRootChildrenNodesValueByType<TSetupRepoAdapterDefinition>(
      BitloopsTypesMapping.TSetupRepoAdapterDefinition,
    );
  const dependencyInjections = setupTree.getRootChildrenNodesValueByType<TDependencyInjections>(
    BitloopsTypesMapping.TDependencyInjections,
  );

  const elementsPerBoundedContext: TSetupElementsPerModule = {
    useCases: UseCaseDefinitionHelpers.getUseCasesForEachBoundedContextModule(useCaseDefinitions),
    restControllers:
      ControllerHelpers.getRESTControllersForEachBoundedContextModule(routerDefinitions),
    graphQLControllers:
      ControllerHelpers.getGraphQLControllersForEachBoundedContextModule(graphQLServerInstances),
    repoAdapters:
      SetupTypeScriptRepos.getRepoAdaptersForEachBoundedContextModule(repoAdapterDefinitions),
    dependencyInjections:
      DependencyInjectionHelpers.getDependencyInjectionsForEachModule(dependencyInjections),
  };
  return elementsPerBoundedContext;
};
