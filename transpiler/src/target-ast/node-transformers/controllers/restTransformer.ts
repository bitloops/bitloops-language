import { RESTControllerNode } from '../../../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

export class RestControllerNodeTSTransformer extends NodeModelToTargetASTTransformer<RESTControllerNode> {
  run(): void {
    this.transformAwait();
    this.transformDotValue();
  }

  private transformAwait(): void {
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    const expression = executeStatement.getExpression();
    if (!expression.isMethodCallExpression()) {
      return;
    }
    expression.prependAwaitToThisMethod();
    return this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private transformDotValue(): void {
    const identifierNode = this.tree.getUseCaseExecuteIdentifier(this.node);
    if (!identifierNode) {
      return;
    }
    const nodes = this.tree.getNodesAfterUseCaseExecute(this.node);
    console.log(nodes);
    this.tree.updateIdentifiersInNodes(nodes, identifierNode, { suffix: '.value' });
  }
}
