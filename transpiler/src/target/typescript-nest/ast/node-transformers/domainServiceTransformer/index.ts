import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainServiceNode } from '../../../../../ast/core/intermediate-ast/nodes/domain-service/DomainServiceNode.js';
import { AppendDotValueNodeTSTransformer } from '../generic/appendDotValue.js';
import { PrependAwaitNodeTSTransformer } from '../generic/prependAwait.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

export class DomainServiceTSTransformer extends NodeModelToTargetASTTransformer<DomainServiceNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;
  private appendDotValueTransformer: AppendDotValueNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: DomainServiceNode) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
    this.appendDotValueTransformer = new AppendDotValueNodeTSTransformer(node, tree);
  }

  run(): void {
    this.transformDotValueOfThisMethodCallExpressions();
    this.prependAwaitToAllDependencyCalls();
  }

  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls();
  }
  private transformDotValueOfThisMethodCallExpressions(): void {
    this.appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
  }
}
