import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';
import { StatementListNode } from './StatementList.js';

export class ReturnStatementNode extends StatementNode {
  private static classNodeName = 'return';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnStatement, metadata, ReturnStatementNode.classNodeName);
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

  isReturnErrorStatement(parentStatementList: StatementListNode): boolean {
    const expression = this.getExpressionValues();
    if (expression.isEvaluation()) {
      const evaluation = expression.getEvaluation();
      if (evaluation.isErrorEvaluation()) {
        return true;
      }
    } else if (expression.isIdentifierExpression()) {
      const identifierName = expression.getIdentifierName();

      const expressionOfDeclaredIdentifier = this.getExpressionOfIdentifierInScope(
        parentStatementList,
        identifierName,
      );
      if (!expressionOfDeclaredIdentifier) {
        // This error should be checked in validation (previous step)
        throw new Error(`This identifier ${identifierName} has not been declared!`);
      }

      if (expressionOfDeclaredIdentifier.isEvaluation()) {
        const evaluationOfDeclaredIdentifier = expressionOfDeclaredIdentifier.getEvaluation();
        if (evaluationOfDeclaredIdentifier.isErrorEvaluation()) {
          return true;
        }
      }
    }
    return false;
  }

  getParentStatementList(): StatementListNode | null {
    let parent = this.getParent();
    while (!parent.isRoot()) {
      if (parent instanceof StatementListNode) {
        return parent;
      }
      parent = parent.getParent();
    }
    return null;
  }

  private getExpressionOfIdentifierInScope(
    parentStatementList: StatementListNode,
    identifierName: string,
  ): ExpressionNode | null {
    if (parentStatementList) {
      const expressionOfDeclaredIdentifier =
        parentStatementList.getExpressionOfDeclaredIdentifier(identifierName);
      if (!expressionOfDeclaredIdentifier) {
        parentStatementList = parentStatementList.getParentStatementList();
        return this.getExpressionOfIdentifierInScope(parentStatementList, identifierName);
      }
      return expressionOfDeclaredIdentifier;
    }
    return null;
  }
}
