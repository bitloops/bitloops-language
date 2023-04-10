import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IdentifierExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../../../../ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { StatementNode } from '../../../../../ast/core/intermediate-ast/nodes/statements/Statement.js';

interface NodeWithStatements extends IntermediateASTNode {
  getStatements(): StatementNode[];
  getParameters?: () => ParameterNode[];
}

export class AppendDotValueNodeTSTransformer {
  constructor(private node: NodeWithStatements, private tree: IntermediateASTTree) {}

  /*
   * Search for all domain evaluation statements, gather their identifiers
   * either from const declaration or var declaration
   * then search for all identifier expressions that use these identifiers
   * and append .value to them
   */
  public transformDotValueOfDomainEvaluations(): void {
    const statements = this.node.getStatements();
    const identifiersToBeUpdated = this.tree.getIdentifiersOfDomainEvaluations(statements);
    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  /*
   * Search for all this method call expressions with two member dot expressions nested, gather their identifiers
   * either from const declaration or var declaration
   * then search for all identifier expressions that use these identifiers
   * and append .value to them
   */
  public transformDotValueOfThisMethodCallExpressions(): void {
    const statements = this.node.getStatements();
    const identifiersToBeUpdated =
      this.tree.getIdentifiersOfThisMethodCallExpressionsWithTwoMemberDots(statements);
    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  /**
   * Domain services return Either, we need to find the identifier that is used by the domain service
   * and append .value to it
   */
  public transformDotValueOfDomainServiceResults(): void {
    const statements = this.node.getStatements();
    const domainServiceIdentifiers = this.tree.getIdentifiersOfDomainServiceResults(statements);
    const identifiersToBeUpdated = this.tree.getResultsOfDomainServiceMethods(
      statements,
      domainServiceIdentifiers,
    );

    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  /**
   * 1. Find all domain identifiers, only interested in aggregates, so aggregate identifiers
   * 2. find the result of aggregate method calls, only when the methods return Either(OK, Error)
   * 3. then transform these results
   */
  public transformDotValueOfDomainMethodResults(): void {
    // This is also used by domainMethods, not only handlers, so we need to check if the node has parameters
    if (!this.node.getParameters) {
      return;
    }
    const statements = this.node.getStatements();
    const parameters = this.node.getParameters();
    const aggregateIdentifiers = this.tree.getIdentifiersOfAggregates(statements, parameters);
    const identifiersToBeUpdated = this.tree.getResultOfAggregateMethodsThatReturnOkError(
      statements,
      aggregateIdentifiers,
    );

    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  // In the case of member dot expressions, we only want to append .value to the left most part
  private updateIdentifierNodes(identifierExpressionNodes: IdentifierExpressionNode[]): void {
    identifierExpressionNodes.forEach((node) => {
      if (this.isMiddleOrRightPartOfMemberDotExpression(node)) {
        return;
      }
      if (node.isUsedByIsInstanceOfExpression()) {
        return;
      }
      node.identifierName = this.appendDotValue(node.identifierName);
    });
  }

  private isMiddleOrRightPartOfMemberDotExpression(identifier: IdentifierExpressionNode): boolean {
    return (
      identifier.isUsedByMemberDotExpression() && !identifier.isLeftMostPartOfMemberDotExpression()
    );
  }

  private appendDotValue(str: string): string {
    return `${str}.value`;
  }
}
