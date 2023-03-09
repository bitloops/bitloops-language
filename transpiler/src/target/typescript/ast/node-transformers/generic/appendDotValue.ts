import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IdentifierExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { MemberDotExpressionNode } from '../../../../../ast/core/intermediate-ast/nodes/Expression/MemberDot/MemberDotExpression.js';
import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../../../../ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';
import { StatementNode } from '../../../../../ast/core/intermediate-ast/nodes/statements/Statement.js';

interface NodeWithDependencies extends IntermediateASTNode {
  getStatements(): StatementNode[];
  getMethodParameters(): ParameterNode[];
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
    const parameters = this.node.getMethodParameters();
    const statements = this.node.getStatements();
    const identifiersOfDomainEvaluations = this.tree.getIdentifiersOfDomainEvaluations(statements);
    const identifiersOfDomainTypes = this.tree.getIdentifiersOfDomainTypes(parameters);
    const identifiersToBeUpdated = [...identifiersOfDomainEvaluations, ...identifiersOfDomainTypes];
    const identifierExpressionNodes = this.tree.getIdentifierExpressionNodesInStatements(
      statements,
      identifiersToBeUpdated,
    );

    this.updateIdentifierNodes(identifierExpressionNodes);
  }

  private updateIdentifierNodes(identifierExpressionNodes: IdentifierExpressionNode[]): void {
    identifierExpressionNodes.forEach((node) => {
      if (this.identifierIsUsedByMemberDotExpression(node)) {
        return;
      }
      node.identifierName = this.appendDotValue(node.identifierName);
    });
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

  private appendDotValue(str: string): string {
    return `${str}.value`;
  }
}
