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
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    const identifierNode = executeStatement.getIdentifier();
    if (!identifierNode) {
      return;
    }
    const identifierValue = identifierNode.getIdentifierName();
    const newValue = `${identifierValue}.value`;

    this.tree.updateIdentifierNodesAfterStatement(executeStatement, identifierValue, newValue);
    return this.tree.buildValueRecursiveBottomUp(this.node);
  }
}
