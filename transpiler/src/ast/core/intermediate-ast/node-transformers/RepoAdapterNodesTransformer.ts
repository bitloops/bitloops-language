import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { RepoAdapterOptions } from '../../../../types.js';
import { TBoundedContexts } from '../../types.js';
import { RepoAdapterNodeBuilder } from '../builders/RepoAdapterNodeBuilder.js';
import { RepoAdapterExpressionNodeBuilder } from '../builders/setup/repo/RepoAdapterExpressionNodeBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { RepoConnectionDefinitionNode } from '../nodes/setup/repo/RepoConnectionDefinitionNode.js';
import { RepoConnectionExpressionNode } from '../nodes/setup/repo/RepoConnectionExpressionNode.js';
import { SetupRepoAdapterDefinitionNode } from '../nodes/setup/repo/SetupRepoAdapterDefinitionNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class RepoAdapterNodesTransformer implements IASTToCompletedASTTransformer {
  constructor(
    protected setupTree: IntermediateASTTree,
    protected intermediateASTCore: TBoundedContexts,
  ) {}

  run(): void {
    const repoAdapterDefinitionNodes = this.setupTree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TSetupRepoAdapterDefinition,
    ) as SetupRepoAdapterDefinitionNode[];
    this.addRepoConnectionInfoToRepoAdapter(repoAdapterDefinitionNodes);
    this.injectRepoAdaptersToASTCore(repoAdapterDefinitionNodes);
  }

  private addRepoConnectionInfoToRepoAdapter(
    repoAdapterDefinitionNodes: SetupRepoAdapterDefinitionNode[],
  ): void {
    const repoConnectionsInfo = this.getRepoConnectionsInfo();
    for (const repoAdapterDefinitionNode of repoAdapterDefinitionNodes) {
      const repoAdapterExpressionNode = repoAdapterDefinitionNode.getRepoAdapterExpression();
      const repoAdapterOptions = repoAdapterExpressionNode.getOptions();
      const evaluationFieldList = repoAdapterOptions.getEvaluationFieldList();
      const connectionFieldNode = evaluationFieldList.findFieldWithName(
        RepoAdapterOptions.connection,
      );
      const connectionExpressionNode = connectionFieldNode
        .getExpression()
        .getChildren()[0] as ExpressionNode;
      if (!connectionExpressionNode.isIdentifierExpression()) {
        throw new Error('Identifier expression not found');
      }
      const connectionName = connectionExpressionNode.getIdentifierName();
      const repoConnectionExpression = repoConnectionsInfo[connectionName];

      const repoAdapterExpressionWithConnectionOptions = new RepoAdapterExpressionNodeBuilder()
        .withBoundedContextModule(repoAdapterExpressionNode.getBoundedContextModule())
        .withOptions(repoAdapterOptions)
        .withDatabaseType(repoAdapterExpressionNode.getDBType())
        .withConcretedRepoPort(repoAdapterExpressionNode.getConcretedRepoPort())
        .withConnection(repoConnectionExpression)
        .build();

      repoAdapterDefinitionNode.replaceChild(
        repoAdapterExpressionNode,
        repoAdapterExpressionWithConnectionOptions,
      );
    }
    const rootNode = this.setupTree.getRootNode();
    this.setupTree.buildValueRecursiveBottomUp(rootNode);
  }

  private injectRepoAdaptersToASTCore(
    repoAdapterDefinitionNodes: SetupRepoAdapterDefinitionNode[],
  ): void {
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

  private getRepoConnectionsInfo(): { [connectionName: string]: RepoConnectionExpressionNode } {
    const repoConnectionDefinitionNodes = this.setupTree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRepoConnectionDefinition,
    ) as RepoConnectionDefinitionNode[];
    const repoConnectionsInfo = {};
    for (const repoConnectionDefinitionNode of repoConnectionDefinitionNodes) {
      const identifierNode = repoConnectionDefinitionNode.getIdentifier();
      const identifierName = identifierNode.getIdentifierName();
      const expressionNode = repoConnectionDefinitionNode.getExpression();
      repoConnectionsInfo[identifierName] = expressionNode;
    }
    return repoConnectionsInfo;
  }
}
