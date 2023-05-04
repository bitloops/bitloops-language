import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { MissingIdentifierError } from '../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { IdentifierExpressionNode } from '../IdentifierExpression.js';

export class MemberDotExpressionNode extends ExpressionNode {
  private static NAME = 'memberDotExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = MemberDotExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TMemberDotExpression;
  }

  getExpressionValues(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression || !expression.getChildren().length) {
      throw new Error('Expression not found');
    }
    return expression.getChildren()[0] as ExpressionNode;
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }

  getIdentifierExpression(): IdentifierExpressionNode {
    const children = this.getChildren();
    const identifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifierExpression,
    );
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierExpressionNode;
  }

  getLeftMostExpression(): ExpressionNode {
    const expression = this.getExpressionValues();
    if (expression.isMemberDotExpression()) {
      return expression.getLeftMostExpression();
    }
    return expression;
  }

  getRightMostExpression(): IdentifierExpressionNode {
    return this.getIdentifierExpression();
  }

  getLeftExpression(): ExpressionNode {
    return this.getExpressionValues();
  }

  getLeftMostMemberDotExpression(): MemberDotExpressionNode {
    const expression = this.getExpressionValues();
    if (expression.isMemberDotExpression()) {
      return expression.getLeftMostMemberDotExpression();
    }
    return this;
  }

  hasMethodCallExpressionParent(): boolean {
    const expressionNode = this.getParent() as ExpressionNode;
    const expressionNodeParent = expressionNode.getParent();
    if (expressionNodeParent.getNodeType() === BitloopsTypesMapping.TMethodCallExpression) {
      return true;
    }
    return false;
  }

  isUsedByMemberDotExpression(): boolean {
    const parent = this.getParent();
    if (!parent) {
      return false;
    }
    if (parent instanceof MemberDotExpressionNode) {
      return true;
    }
    return false;
  }

  public getStringValue(): string {
    const expression = this.getExpression();
    const leftStringValue = expression.getStringValue();
    return leftStringValue + '.' + this.getIdentifierExpression().getIdentifierName();
  }

  public typeCheck(symbolTable: SymbolTable): void {
    const leftMostExpression = this.getLeftMostExpression();
    let identifierName: string;
    if (leftMostExpression.isIdentifierExpression()) {
      identifierName = leftMostExpression.getIdentifierName();
    } else if (leftMostExpression.isThisExpression()) {
      identifierName = leftMostExpression.getIdentifierName();
    }

    const identifierType = symbolTable.lookup(identifierName);
    if (!identifierType) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
  }
}
