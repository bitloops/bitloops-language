import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { ArgumentListNode } from '../ArgumentList/ArgumentListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
import { MemberDotExpressionNode } from './MemberDot/MemberDotExpression.js';
import { ThisExpressionNode } from './ThisExpressionNode.js';

const NAME = 'methodCallExpression';
export class MethodCallExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TMethodCallExpression;
    this.classNodeName = NAME;
  }

  getMethodName(): string {
    const expression = this.getExpressionValues();
    if (expression.isIdentifierExpression()) {
      return expression.identifierName;
    }
    if (expression.isMemberDotExpression()) {
      const identifierExpressionNode = expression.getIdentifierExpression();
      return identifierExpressionNode.identifierName;
    }
    return null;
  }

  getExpressionValues(): ExpressionNode {
    const children = this.getChildren();
    const expressionWrapper = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expressionWrapper) {
      throw new Error('Expression not found');
    }

    const expression = expressionWrapper.getChildren()[0] as ExpressionNode;
    return expression;
  }

  getThisNode(): ThisExpressionNode {
    const expression = this.getExpressionValues();

    if (!expression.isMemberDotExpression()) {
      throw new Error('Expression is not a member dot expression');
    }
    // Find leftmost expression of dotMemberExpression
    const leftMostExpression = expression.getLeftMostExpression();
    if (!leftMostExpression.isThisExpression()) {
      throw new Error('Leftmost expression is not a this expression');
    }
    return leftMostExpression;
  }

  isThisDependencyMethodCall(dependencyIdentifier: string): boolean {
    if (!this.isThisMethodCall()) {
      return false;
    }
    const leftMostMemberDotExpression = (
      this.getExpressionValues() as MemberDotExpressionNode
    ).getLeftMostMemberDotExpression();
    return (
      leftMostMemberDotExpression.getIdentifierExpression().identifierName === dependencyIdentifier
    );
  }

  private isThisMethodCall(): boolean {
    const expression = this.getExpressionValues();

    if (!expression.isMemberDotExpression()) {
      return false;
    }
    const leftMostExpression = expression.getLeftMostExpression();
    if (!leftMostExpression.isThisExpression()) {
      return false;
    }
    return true;
  }

  public getArgumentList(): ArgumentListNode {
    const argumentList = this.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );
    return argumentList;
  }

  public override typeCheck(symbolTable: SymbolTable): void {
    const expressionNode = this.getExpressionValues();
    expressionNode.typeCheck(symbolTable);

    const argumentList = this.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );

    const argumentNodes = argumentList.arguments;

    for (const argument of argumentNodes) {
      const expression = argument.getExpression();
      expression.typeCheck(symbolTable);
    }
  }
}
