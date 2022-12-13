import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { EvaluationNode } from '../Expression/Evaluation/EvaluationNode.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StatementNode } from './Statement.js';
import { StatementListNode } from './StatementList.js';

export class ReturnStatementNode extends StatementNode {
  private static classNodeName = 'return';

  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnStatement, metadata, ReturnStatementNode.classNodeName);
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    )!;
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }

  isReturnErrorStatement(parentStatementList: StatementListNode): boolean {
    const expression = this.getExpression();
    if (expression.isEvaluation()) {
      if ((expression as EvaluationNode).isErrorEvaluation()) {
        return true;
      }
    } else if (expression.isIdentifierExpression()) {
      const identifierName = expression.getIdentifierName();

      const expressionOfDeclaredIdentifier =
        parentStatementList.getExpressionOfDeclaredIdentifier(identifierName);
      if (!expressionOfDeclaredIdentifier) {
        throw new Error(`This identifier ${identifierName} has not been declared!`);
      }

      if (expressionOfDeclaredIdentifier.isEvaluation()) {
        if ((expressionOfDeclaredIdentifier as EvaluationNode).isErrorEvaluation()) {
          return true;
        }
      }
    }
    return false;
  }
}
