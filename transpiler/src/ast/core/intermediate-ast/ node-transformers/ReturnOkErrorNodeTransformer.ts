import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ReturnOKErrorNodeTransformer extends NodeModelToTargetASTTransformer<ReturnOkErrorTypeNode> {
  run(): void {
    this.modifyReturnOKErrorStatements();
    // this.addReturnOkVoidStatement();
  }

  private modifyReturnOKErrorStatements(): void {
    const parentNode = this.node.getParent();
    const returnStatementNodes = this.tree.getReturnStatementsOfNode(parentNode);
    for (const returnStatementNode of returnStatementNodes) {
      const parentStatementListNode = this.tree.getStatementListParentNode(returnStatementNode);
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

  // private addReturnOkVoidStatement(): void {
  //   const parentNode = this.node.getParent();
  //   const returnStatements = this.tree.getReturnStatementsOfNode(parentNode);
  //   // console.log('returnStatements', returnStatements);
  //   if (returnStatements.length === 0) {
  //     const returnOKNode = new ReturnOKStatementNodeBuilder().build();

  //     //We only have one statementList
  //     const [statementListNode] = parentNode
  //       .getChildren()
  //       .filter((node) => node.IsStatementListNode());

  //     statementListNode.addChild(returnOKNode);
  //     // this.node.addChild(statementListNode);
  //     // this.tree.buildValueRecursiveBottomUp(this.node); // this is called in the run method
  //   }
  // }
}
