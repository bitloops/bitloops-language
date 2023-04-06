import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { IntegrationEventHandlerDeclarationNode } from '../../../../ast/core/intermediate-ast/nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { AppendDotValueNodeTSTransformer } from './generic/appendDotValue.js';

export class IntegrationEventHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<IntegrationEventHandlerDeclarationNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;
  private appendDotValueTransformer: AppendDotValueNodeTSTransformer;

  constructor(
    protected tree: IntermediateASTTree,
    protected node: IntegrationEventHandlerDeclarationNode,
  ) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
    this.appendDotValueTransformer = new AppendDotValueNodeTSTransformer(node, tree);
  }

  run(): void {
    this.transformDotValue();
    this.prependAwaitToAllDependencyCalls();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const extraDependencies = this.node.getEventBusDependencies();
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls(extraDependencies);
    this.prependAwaitTransformer.prependAwaitToDomainServiceEvaluationNode();
  }

  private transformDotValue(): void {
    this.appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
    this.appendDotValueTransformer.transformDotValueOfDomainServiceResults();
  }
}
