import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';
import { VariableDeclarationNode } from './variableDeclaration.js';
import { ConstDeclarationNode } from './ConstDeclarationNode.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';

export abstract class StatementNode extends IntermediateASTNode {
  isConstDeclarationNode(): this is ConstDeclarationNode {
    return this.getNodeType() === BitloopsTypesMapping.TConstDeclaration;
  }

  isVariableDeclarationNode(): this is VariableDeclarationNode {
    return this.getNodeType() === BitloopsTypesMapping.TVariableDeclaration;
  }

  isExecuteStatementNode = (): this is ConstDeclarationNode => {
    if (!this.isConstDeclarationNode()) {
      return false;
    }

    const expressionNode = this.getExpressionValues();
    if (!expressionNode.isMethodCallExpression()) {
      return false;
    }
    if (expressionNode.getMethodName() === 'execute') {
      return true;
    }

    return false;
  };

  getExpression(): ExpressionNode | null {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression) {
      return null;
    }
    return expression as ExpressionNode;
  }

  isExpressionNode(): this is ExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TExpression;
  }

  /**
   * It returns an array of the ExpressionNodes including in the statement
   * we use it in domainRule nodeTransformer to prepend `this` to every
   * parameter of the domainRule which is used in the statement
   * we check the children and get the expression
   */
  getAllExpressions(): ExpressionNode[] {
    const children = this.getChildren();
    const expressions = [];
    expressions.push(
      children.find((child) => child.getNodeType() === BitloopsTypesMapping.TExpression),
    );
    return expressions;
  }
}
