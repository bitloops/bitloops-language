import { ControllerNode } from '../../../ast/core/intermediate-ast/nodes/controllers/ControllerNode.js';
import { GraphQLControllerNode } from '../../../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';
import { RESTControllerNode } from '../../../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

class BaseControllerNodeTSTransformer<
  T extends ControllerNode,
> extends NodeModelToTargetASTTransformer<T> {
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
    const identifierValue = identifierNode.getIdentifierName();
    const newValue = `${identifierValue}.value`;

    this.tree.updateIdentifierNodesAfterStatement(executeStatement, identifierValue, newValue);
    return this.tree.buildValueRecursiveBottomUp(this.node);
  }
}

export class RestControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<RESTControllerNode> {}
export class GraphQLControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<GraphQLControllerNode> {}
