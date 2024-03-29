import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { DomainRuleNode } from '../../../../ast/core/intermediate-ast/nodes/DomainRule/DomainRuleNode.js';
import { PrependThisNodeTSTransformer } from './generic/prependThis.js';
import { IdentifierExpressionNode } from '../../../../ast/core/intermediate-ast/nodes/Expression/IdentifierExpression.js';
import { ExpressionNode } from '../../../../ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ArgumentNode } from '../../../../ast/core/intermediate-ast/nodes/ArgumentList/ArgumentNode.js';

export class DomainRuleNodeTSTransformer extends NodeModelToTargetASTTransformer<DomainRuleNode> {
  private prependThisTransformer: PrependThisNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: DomainRuleNode) {
    super(tree, node);
    this.prependThisTransformer = new PrependThisNodeTSTransformer();
  }

  run(): void {
    this.prependThisToAllParametersUsedAsStatements();
    this.prependThisToAllParametersUsedInBrokenIf();
  }

  //prepend this to all parameters used as statements
  private prependThisToAllParametersUsedAsStatements(): void {
    //find all parameters of the DomainRule
    const parameters = this.node.getParameters();
    const parameterIdentifiers = parameters.map((parameter) => parameter.getIdentifier());
    // DomainRuleNode -> Find all statements
    const statements = this.node.getStatements();
    if (!statements) {
      return;
    }
    for (const statement of statements) {
      const statementTopExpressions = statement.getAllExpressions();
      for (const statementTopExpression of statementTopExpressions) {
        this.createThisMemberDotExpressionAndReplaceIdentifierExpression(
          statementTopExpression,
          parameterIdentifiers,
        );
      }
    }
  }

  //prepend this to all parameters used in condition of isBrokenIf
  private prependThisToAllParametersUsedInBrokenIf(): void {
    //find all parameters of the DomainRule
    const parameters = this.node.getParameters();
    const parameterIdentifiers = parameters.map((parameter) => parameter.getIdentifier());
    // DomainRuleNode -> Find IfBrokenNode
    const ifBrokenNode = this.node.getIsBrokenCondition();
    // get condition of IfBrokenNode
    const ifBrokenCondition = ifBrokenNode.getCondition();
    const ifBrokenConditionTopExpression = ifBrokenCondition.expression;
    this.createThisMemberDotExpressionAndReplaceIdentifierExpression(
      ifBrokenConditionTopExpression,
      parameterIdentifiers,
    );

    // IfBrokenNode -> Find from secondArgument, all the error arguments
    const errorArguments = ifBrokenNode.getErrorArguments();
    if (this.ifBrokenIfHasNoErrorArguments(errorArguments)) {
      // No error arguments, nothing to do
      return;
    }

    // Scan each error argument, if it contains and identifierExpression where the identifier == one of the parameters,
    for (const errorArgument of errorArguments) {
      const argumentTopExpression = errorArgument.getExpression();
      this.createThisMemberDotExpressionAndReplaceIdentifierExpression(
        argumentTopExpression,
        parameterIdentifiers,
      );
    }
  }

  private ifBrokenIfHasNoErrorArguments(errorArguments: ArgumentNode[]): boolean {
    return errorArguments.length === 0;
  }

  private lookForParameterUsedAsIdentifierExpression(
    expression: ExpressionNode,
    parameters: string[],
  ): IdentifierExpressionNode[] | null {
    const identifierExpressionNodes: IdentifierExpressionNode[] = [];
    this.tree.traverse(expression, (node) => {
      if (
        node instanceof IdentifierExpressionNode &&
        parameters.includes(node.getIdentifierName())
      ) {
        identifierExpressionNodes.push(node);
      }
    });
    if (identifierExpressionNodes.length === 0) return null;
    return identifierExpressionNodes;
  }

  /**
   * creates a new memberDotExpression with this and the identifierExpression as children
   * and replaces the identifierExpression with the new memberDotExpression in the tree
   */
  private createThisMemberDotExpressionAndReplaceIdentifierExpression(
    expression: ExpressionNode,
    parameters: string[],
  ): void {
    // All concrete expression have an Generic Expression as parent
    // It might be a parenthesized expression, an additive expression (e.g. status + "hello")
    // So we must basically look recursively for the identifierExpression
    // If we find it, then we must prepend 'this.' to the identifierExpression
    // Unless it's not the left-most part of a memberDotExpression
    const identifierExpressions = this.lookForParameterUsedAsIdentifierExpression(
      expression,
      parameters,
    );
    if (identifierExpressions === null) return;
    //we may have found multiple identifierExpressions, because of multiple parameters of isBrokenIf
    for (const identifierExpression of identifierExpressions) {
      if (
        identifierExpression.isUsedByMemberDotExpression() &&
        !identifierExpression.isLeftMostPartOfMemberDotExpression()
      )
        continue;

      // Create the new memberDotExpression with this

      this.prependThisTransformer.replaceIdentifierExpressionNodeWithThisMemberDotNode(
        identifierExpression,
      );
    }
  }
}
