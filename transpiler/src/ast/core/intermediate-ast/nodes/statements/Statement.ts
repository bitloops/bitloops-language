import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ConstDeclarationNode } from './ConstDeclaration.js';
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

    const expressionNodeWrapper = this.getExpression();
    const expressionNode = expressionNodeWrapper.getChildren()[0] as ExpressionNode;
    if (!expressionNode.isMethodCallExpression()) {
      return false;
    }
    if (expressionNode.getMethodName() === 'execute') {
      return true;
    }

    return false;
  };
}
