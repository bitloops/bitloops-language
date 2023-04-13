import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';
import { VariableDeclarationNode } from '../variableDeclaration.js';
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

  isExpressionNode(): this is ExpressionNode {
    return this.getNodeType() === BitloopsTypesMapping.TExpression;
  }

  // getIdentifier(): IdentifierNode {
  //   const children = this.getChildren();
  //   const identifier = children.find(
  //     (child) => child.getNodeType() === BitloopsTypesMapping.TIdentifier,
  //   );
  //   if (!identifier) {
  //     throw new Error('Identifier not found');
  //   }
  //   return identifier as IdentifierNode;
  // }
}
