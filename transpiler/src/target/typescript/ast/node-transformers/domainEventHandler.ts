import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainEventHandlerDeclarationNode } from '../../../../ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { AppendDotValueNodeTSTransformer } from './generic/appendDotValue.js';

export class DomainEventHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<DomainEventHandlerDeclarationNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;
  private appendDotValueTransformer: AppendDotValueNodeTSTransformer;

  constructor(
    protected tree: IntermediateASTTree,
    protected node: DomainEventHandlerDeclarationNode,
  ) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
    this.appendDotValueTransformer = new AppendDotValueNodeTSTransformer(node, tree);
  }

  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.transformDotValue();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const extraDependencies = this.node.getExtraDependencies();
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls(extraDependencies);
  }

  private transformDotValue(): void {
    this.appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
  }
}
