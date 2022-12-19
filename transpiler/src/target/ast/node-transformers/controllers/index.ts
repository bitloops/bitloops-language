import { ControllerNode } from '../../../../ast/core/intermediate-ast/nodes/controllers/ControllerNode.js';
import { GraphQLControllerNode } from '../../../../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';
import { RESTControllerNode } from '../../../../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { ExpressionNode } from '../../../../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { MethodCallExpressionNode } from '../../../../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

class BaseControllerNodeTSTransformer<
  T extends ControllerNode,
> extends NodeModelToTargetASTTransformer<T> {
  run(): void {
    this.transformAwait();
    this.transformDotValue();
    this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private transformAwait(): void {
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    if (executeStatement.isExpressionNode()) {
      return this.handleAwaitOfPlainMethodCall(executeStatement);
    }

    const expression = executeStatement.getExpression();
    if (!expression.isMethodCallExpression()) {
      throw new Error('Method call expression not found');
    }
    this.prependAwaitToMethodCallNode(expression);
  }

  private transformDotValue(): void {
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    if (executeStatement.isExpressionNode()) {
      return;
    }
    const identifierNode = executeStatement.getIdentifier();
    const identifierValue = identifierNode.getIdentifierName();
    const identifierWithAppendedDotValue = this.appendDotValue(identifierValue);

    this.tree.updateIdentifierExpressionNodesAfterStatement(
      executeStatement,
      identifierValue,
      identifierWithAppendedDotValue,
    );
  }

  private handleAwaitOfPlainMethodCall(expression: ExpressionNode): void {
    const methodCallExpression = expression.getChildren()[0] as ExpressionNode;
    if (!methodCallExpression.isMethodCallExpression()) {
      throw new Error('Method call expression not found');
    }
    this.prependAwaitToMethodCallNode(methodCallExpression);
  }

  private prependAwaitToMethodCallNode(node: MethodCallExpressionNode): void {
    const thisNode = node.getThisNode();
    thisNode.updateValue('await this');
  }

  private appendDotValue(str: string): string {
    return `${str}.value`;
  }
}

export class RestControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<RESTControllerNode> {}
export class GraphQLControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<GraphQLControllerNode> {}
