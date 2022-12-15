import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ReturnOKErrorNodeTransformer extends NodeModelToTargetASTTransformer<ReturnOkErrorTypeNode> {
  run(): void {
    this.addReturnOkVoidStatement();
    this.modifyReturnOKErrorStatements();
  }

  private modifyReturnOKErrorStatements(): void {
    const parentNode = this.node.getParent();
    const returnStatementNodes = this.tree.getReturnStatementsOfNode(parentNode);
    for (const returnStatementNode of returnStatementNodes) {
      const parentStatementListNode = returnStatementNode.getParentStatementList();
      const expressionOfReturnStatement = returnStatementNode.getExpression();
      const newExpression = new ExpressionBuilder()
        .withExpression(expressionOfReturnStatement)
        .build();
      const metadataOfReturnStatement = returnStatementNode.getMetadata();
      if (returnStatementNode.isReturnErrorStatement(parentStatementListNode)) {
        const returnErrorStatementNode = new ReturnErrorStatementNodeBuilder(
          metadataOfReturnStatement,
        )
          .withExpression(newExpression)
          .build();
        parentStatementListNode.replaceChild(returnStatementNode, returnErrorStatementNode);
      } else {
        const returnOkStatementNode = new ReturnOKStatementNodeBuilder(metadataOfReturnStatement)
          .withExpression(newExpression)
          .build();
        parentStatementListNode.replaceChild(returnStatementNode, returnOkStatementNode);
      }
    }
  }

  private addReturnOkVoidStatement(): void {
    const parentNode = this.node.getParent();
    const returnStatements = this.tree.getReturnStatementsOfNode(parentNode);
    if (returnStatements.length === 0) {
      const returnOKNode = new ReturnOKStatementNodeBuilder().build();

      //We only have one statementList
      const [statementListNode] = parentNode
        .getChildren()
        .filter((node) => node.IsStatementListNode());

      if (statementListNode) {
        statementListNode.addChild(returnOKNode);
      }
    }
  }
}
