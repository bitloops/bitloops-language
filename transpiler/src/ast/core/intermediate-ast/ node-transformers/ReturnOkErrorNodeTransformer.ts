import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ReturnOKErrorNodeTransformer extends NodeModelToTargetASTTransformer<ReturnOkErrorTypeNode> {
  run(): void {
    this.modifyReturnOKErrorStatements();
    this.addReturnOkVoidStatement();
  }

  private modifyReturnOKErrorStatements(): void {
    const parentNode = this.node.getParent();
    const returnStatementNodes = this.tree.getReturnStatementsOfNode(parentNode);
    for (const returnStatementNode of returnStatementNodes) {
      const parentStatementListNode = this.tree.getStatementListParentNode(returnStatementNode);
      const expressionOfReturnStatement = returnStatementNode.getExpression();
      const metadataOfReturnStatement = returnStatementNode.getMetadata();
      parentStatementListNode.removeChild(returnStatementNode);
      if (returnStatementNode.isReturnErrorStatement(parentStatementListNode)) {
        const returnErrorStatementNode = new ReturnErrorStatementNodeBuilder(
          metadataOfReturnStatement,
        )
          .withExpression(expressionOfReturnStatement)
          .build();
        parentStatementListNode.addChild(returnErrorStatementNode);
      } else {
        const returnOkStatementNode = new ReturnOKStatementNodeBuilder(metadataOfReturnStatement)
          .withExpression(expressionOfReturnStatement)
          .build();
        parentStatementListNode.addChild(returnOkStatementNode);
      }
    }
  }

  private addReturnOkVoidStatement(): void {
    console.log(this.node);
  }
}
