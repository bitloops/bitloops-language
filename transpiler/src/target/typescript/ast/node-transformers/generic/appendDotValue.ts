import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IdentifierExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { StatementNode } from '../../../../../ast/core/intermediate-ast/nodes/statements/Statement.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getStatements(): StatementNode[];
}

export class AppendDotValueNodeTSTransformer {
  constructor(private node: NodeWithDependencies, private tree: IntermediateASTTree) {}

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

  // In the case of member dot expressions, we only want to append .value to the left most part
  private updateIdentifierNodes(identifierExpressionNodes: IdentifierExpressionNode[]): void {
    identifierExpressionNodes.forEach((node) => {
      if (this.isMiddleOrRightPartOfMemberDotExpression(node)) {
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
