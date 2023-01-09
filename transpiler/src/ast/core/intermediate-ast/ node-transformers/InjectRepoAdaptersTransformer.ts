import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TBoundedContexts } from '../../types.js';
import { RepoAdapterNodeBuilder } from '../builders/RepoAdapterNodeBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RepoAdapterDefinitionNode } from '../nodes/setup/repo/RepoAdapterDefinitionNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class InjectRepoAdaptersTransformer implements IASTToCompletedASTTransformer {
  constructor(
    protected setupTree: IntermediateASTTree,
    protected intermediateASTCore: TBoundedContexts,
  ) {}

  run(): void {
    this.injectRepoAdaptersToASTCore();
  }

  private injectRepoAdaptersToASTCore(): void {
    const repoAdapterDefinitionNodes = this.setupTree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRepoAdapterDefinition,
    ) as RepoAdapterDefinitionNode[];
    for (const repoAdapterDefinitionNode of repoAdapterDefinitionNodes) {
      const identifierNode = repoAdapterDefinitionNode.getIdentifier();
      const repoAdapterExpressionNode = repoAdapterDefinitionNode.getRepoAdapterExpression();
      const boundedContextModuleNode = repoAdapterExpressionNode.getBoundedContextModule();
      const moduleNode = boundedContextModuleNode.getModule();
      const boundedContextNode = boundedContextModuleNode.getBoundedContext();
      const moduleName = moduleNode.getName();
      const boundedContextName = boundedContextNode.getName();

      if (
        this.intermediateASTCore &&
        this.intermediateASTCore[boundedContextName] &&
        this.intermediateASTCore[boundedContextName][moduleName]
      ) {
        const coreTree = this.intermediateASTCore[boundedContextName][moduleName];
        const metadata = repoAdapterDefinitionNode.getMetadata();
        new RepoAdapterNodeBuilder(coreTree, metadata)
          .withIdentifier(identifierNode)
          .withExpression(repoAdapterExpressionNode)
          .build();
      }
    }
  }
}
