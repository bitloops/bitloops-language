import { MethodCallExpressionNode } from '../../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { UseCaseNode } from '../../ast/core/intermediate-ast/nodes/UseCase/UseCaseNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class UseCaseNodeTSTransformer extends NodeModelToTargetASTTransformer<UseCaseNode> {
  run(): void {
    this.prependAwaitToAllDependencyCalls();
    // this.transformDotValue();
    this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private prependAwaitToAllDependencyCalls(): void {
    const useCaseDependencies = this.node.getAllDependenciesIdentifiers();
    if (!useCaseDependencies.length) {
      return;
    }
    this.prependAwaitToDependencies(useCaseDependencies);
  }

  // private transformDotValue(): void {
  //   const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
  //   if (!executeStatement) {
  //     return;
  //   }

  //   if (executeStatement.isExpressionNode()) {
  //     return;
  //   }
  //   const identifierNode = executeStatement.getIdentifier();
  //   const identifierValue = identifierNode.getIdentifierName();
  //   const identifierWithAppendedDotValue = this.appendDotValue(identifierValue);

  //   this.tree.updateIdentifierNodesAfterStatement(
  //     executeStatement,
  //     identifierValue,
  //     identifierWithAppendedDotValue,
  //   );
  // }

  private prependAwaitToDependencies(dependencies: string[]): void {
    const statements = this.node.getStatements();
    const methodCallNodes = this.tree.getMethodCallsThatUseThisDependencies(
      dependencies,
      statements,
    );
    methodCallNodes.forEach((node) => this.prependAwaitToMethodCallNode(node));
  }

  // private handleAwaitOfPlainMethodCall(expression: ExpressionNode): void {
  //   const methodCallExpression = expression.getChildren()[0] as ExpressionNode;
  //   if (!methodCallExpression.isMethodCallExpression()) {
  //     throw new Error('Method call expression not found');
  //   }
  //   this.prependAwaitToMethodCallNode(methodCallExpression);
  // }

  private prependAwaitToMethodCallNode(node: MethodCallExpressionNode): void {
    const thisNode = node.getThisNode();
    thisNode.updateValue('await this');
  }

  // private appendDotValue(str: string): string {
  //   return `${str}.value`;
  // }
}
