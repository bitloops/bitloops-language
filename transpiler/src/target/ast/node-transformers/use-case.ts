import { IdentifierExpressionNode } from '../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { MemberDotExpressionNode } from '../../../ast/core/intermediate-ast/nodes/Expression/MemberDot/MemberDotExpression.js';
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
      // Update only if i don't have a grandparent, or my grandparent is not an expression/member dot
      (node) => {
        if (this.identifierIsUsedByMemberDotExpression(node)) {
          return;
        }
        node.identifierName = this.appendDotValue(node.identifierName);
      },
    );
  }

  /**
   *  If its the left part of a member dot expression, then its grandParent is a member dot expression
   * if its the right part of a member dot expression, then its parent is a member dot expression
   */
  private identifierIsUsedByMemberDotExpression(identifier: IdentifierExpressionNode): boolean {
    const parent = identifier.getParent();
    if (!parent) {
      return false;
    }
    const identifierIsRightPartOfMemberDotExpression = parent instanceof MemberDotExpressionNode;
    if (identifierIsRightPartOfMemberDotExpression) {
      return true;
    }
    const grandParent = parent.getParent();
    if (!grandParent) {
      return false;
    }
    const identifierIsLeftPartOfMemberDotExpression =
      grandParent instanceof MemberDotExpressionNode;
    return identifierIsLeftPartOfMemberDotExpression;
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
