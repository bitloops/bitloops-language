import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { ConstDeclarationNode } from './ConstDeclaration.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export abstract class StatementNode extends IntermediateASTNode {
  isConstDeclarationNode(): this is ConstDeclarationNode {
    return this.getNodeType() === BitloopsTypesMapping.TConstDeclaration;
  }

  isUseCaseExecuteStatementNode = (): this is ConstDeclarationNode => {
    if (!this.isConstDeclarationNode()) {
      return false;
    }

    const expressionNode = this.getExpression();
    if (expressionNode.isMethodCallExpression()) {
      const methodName = expressionNode.getMethodName();
      // Todo check for this & (.) operator
      if (methodName === 'execute') {
        return true;
      }
    }
    return false;
  };
}
