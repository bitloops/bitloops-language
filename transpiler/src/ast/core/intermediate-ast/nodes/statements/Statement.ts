import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ConstDeclarationNode } from './ConstDeclarationNode.js';
// import { MethodCallExpressionNode } from './Expression/MethodCallExpression.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';

export abstract class StatementNode extends IntermediateASTNode {
  isConstDeclarationNode(): this is ConstDeclarationNode {
    return this.getNodeType() === BitloopsTypesMapping.TConstDeclaration;
  }

  isUseCaseExecuteStatementNode = (): this is ConstDeclarationNode => {
    if (!this.isConstDeclarationNode()) {
      return false;
    }

    const expressionNode = this.getExpression();
    if (!expressionNode.isMethodCallExpression()) {
      return false;
    }
    if (expressionNode.getMethodName() === 'execute') {
      return true;
    }

    return false;
  };

  isExpressionNode(): this is ExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TExpression;
  }
}
