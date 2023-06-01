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
    // TODO Optional/Edge case: A parameter can also be used as statement inside the rule, so we better take care of that case too.
    // eg const value = parameter -> should become -> const value = this.parameter
    this.prependThisToAllParametersUsedAsErrorArguments();
  }

  private prependThisToAllParametersUsedAsErrorArguments(): void {
    // 1. find all parameters of the DomainRule
    const parameters = this.node.getParameters();
    const parameterIdentifiers = parameters.map((parameter) => parameter.getIdentifier());
    // DomainRuleNode -> Find IfBrokenNode

    const ifBrokenNode = this.node.getIsBrokenCondition();
    // IfBrokenNode -> Find from secondArgument, all the error arguments
    const errorArguments = ifBrokenNode.getErrorArguments();
    if (this.ifBrokenIfHasNoErrorArguments(errorArguments)) {
      // No error arguments, nothing to do
      return;
    }

    // Scan each error argument, if it contains and identifierExpression where the identifier == one of the parameters,
    for (const errorArgument of errorArguments) {
      const argumentTopExpression = errorArgument.getExpression();
      // All concrete expression have an Generic Expression as parent
      const concreteExpression = argumentTopExpression.getExpression();
      // It might be a parenthesized expression, an additive expression (e.g. status + "hello")
      // So we must basically look recursively for the identifierExpression
      // If we find it, then we must prepend 'this.' to the identifierExpression
      // Unless it's not the left-most part of a memberDotExpression
      const identifierExpression = this.lookForParameterUsedAsIdentifierExpression(
        concreteExpression,
        parameterIdentifiers,
      );
      if (identifierExpression === null) {
        continue;
      }
      if (
        identifierExpression.isUsedByMemberDotExpression() &&
        !identifierExpression.isLeftMostPartOfMemberDotExpression()
      ) {
        continue;
      }
      // This is what we are look for,
      const newMemberDotExpr =
        this.prependThisTransformer.replaceIdentifierExpressionNodeToThisMemberDotNode(
          identifierExpression,
        );

      // TODO Now we must replace the identifierExpression with the newMemberDotExpr in the tree.
      console.log('newMemberDotExpr', newMemberDotExpr);
    }
  }

  private ifBrokenIfHasNoErrorArguments(errorArguments: ArgumentNode[]): boolean {
    return errorArguments.length === 0;
  }

  private lookForParameterUsedAsIdentifierExpression(
    expression: ExpressionNode,
    parameters: string[],
  ): IdentifierExpressionNode | null {
    let identifierExpressionNode: null | IdentifierExpressionNode = null;
    this.tree.traverse(expression, (node) => {
      if (
        node instanceof IdentifierExpressionNode &&
        parameters.includes(node.getIdentifierName())
      ) {
        identifierExpressionNode = node;
      }
    });
    return identifierExpressionNode;
  }
}
