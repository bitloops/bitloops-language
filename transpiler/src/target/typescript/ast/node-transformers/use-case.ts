import { UseCaseNode } from '../../../../ast/core/intermediate-ast/nodes/UseCase/UseCaseNode.js';
import { AppendDotValueNodeTSTransformer } from './generic/appendDotValue.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class UseCaseNodeTSTransformer extends NodeModelToTargetASTTransformer<UseCaseNode> {
  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.transformDotValue();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const awaitTransformer = new PrependAwaitNodeTSTransformer(this.node, this.tree);
    awaitTransformer.prependAwaitToAllDependencyCalls();
  }

  private transformDotValue(): void {
    const appendDotValueTransformer = new AppendDotValueNodeTSTransformer(this.node, this.tree);
    appendDotValueTransformer.transformDotValueOfDomainEvaluations();
    appendDotValueTransformer.transformDotValueOfThisMethodCallExpressions();
  }
}
