import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { IntegrationEventHandlerDeclarationNode } from '../../../../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';

export class IntegrationEventHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<IntegrationEventHandlerDeclarationNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;

  constructor(
    protected tree: IntermediateASTTree,
    protected node: IntegrationEventHandlerDeclarationNode,
  ) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
  }

  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.prependAwaitTransformer.prependAwaitToDomainServiceEvaluationNode();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const extraDependencies = this.node.getEventBusDependencies();
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls(extraDependencies);
  }
}
