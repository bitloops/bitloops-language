import { IdentifierExpressionNode } from '../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { MethodCallExpressionNode } from '../../../ast/core/intermediate-ast/nodes/Expression/MethodCallExpression.js';
import { UseCaseNode } from '../../../ast/core/intermediate-ast/nodes/UseCase/UseCaseNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class UseCaseNodeTSTransformer extends NodeModelToTargetASTTransformer<UseCaseNode> {
  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.transformDotValueOfDomainEvaluations();
    this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private prependAwaitToAllDependencyCalls(): void {
    const useCaseDependencies = this.node.getAllDependenciesIdentifiers();
    if (!useCaseDependencies.length) {
      return;
    }
    this.prependAwaitToDependencies(useCaseDependencies);
  }

  /*
   * Search for all domain evaluation statements, gather their identifiers
   * either from const declaration or var declaration
   * then search for all identifier expressions that use these identifiers
   * and append .value to them
   */
  private transformDotValueOfDomainEvaluations(): void {
    const statements = this.node.getStatements();
    const identifiersToBeUpdated = this.tree.getIdentifiersOfDomainEvaluations(statements);
    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  private updateIdentifierNodes(identifierExpressionNodes: IdentifierExpressionNode[]): void {
    identifierExpressionNodes.forEach(
      (node) => (node.identifierName = this.appendDotValue(node.identifierName)),
    );
  }

  private prependAwaitToDependencies(dependencies: string[]): void {
    const statements = this.node.getStatements();
    const methodCallNodes = this.tree.getMethodCallsThatUseThisDependencies(
      dependencies,
      statements,
    );
    methodCallNodes.forEach((node) => this.prependAwaitToMethodCallNode(node));
  }

  private prependAwaitToMethodCallNode(node: MethodCallExpressionNode): void {
    const thisNode = node.getThisNode();
    thisNode.updateValue('await this');
  }

  private appendDotValue(str: string): string {
    return `${str}.value`;
  }
}
