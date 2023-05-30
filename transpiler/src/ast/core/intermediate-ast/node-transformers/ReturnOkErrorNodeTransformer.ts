import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionBuilder } from '../builders/expressions/ExpressionBuilder.js';
import { ReturnErrorStatementNodeBuilder } from '../builders/statements/ReturnErrorStatementNodeBuilder.js';
import { ReturnOKStatementNodeBuilder } from '../builders/statements/ReturnOkStatamentNodeBuilder.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKStatementNode } from '../nodes/statements/ReturnOKStatementNode.js';
import { ReturnStatementNode } from '../nodes/statements/ReturnStatementNode.js';
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
      // Because anonymous functions are also used by ifError expressions, we need to check if the return statement is used by an ifError
      if (
        this.returnStatementIsUsedByAnonymousFunction(returnStatementNode) &&
        !this.returnStatementIsUsedByIfError(returnStatementNode)
      ) {
        continue;
      }
      const parentStatementListNode = returnStatementNode.getParentStatementList();
      const expressionOfReturnStatement = returnStatementNode.getExpressionValues();
      const metadataOfReturnStatement = returnStatementNode.getMetadata();
      if (returnStatementNode.isReturnErrorStatement(parentStatementListNode)) {
        const newExpression = new ExpressionBuilder()
          .withExpression(expressionOfReturnStatement)
          .build();
        const returnErrorStatementNode = new ReturnErrorStatementNodeBuilder(
          metadataOfReturnStatement,
        )
          .withExpression(newExpression)
          .build();
        parentStatementListNode.replaceChild(returnStatementNode, returnErrorStatementNode);
      } else {
        let returnOkStatementNode: ReturnOKStatementNode;
        if (!expressionOfReturnStatement) {
          returnOkStatementNode = new ReturnOKStatementNodeBuilder(
            metadataOfReturnStatement,
          ).build();
        } else {
          const newExpression = new ExpressionBuilder()
            .withExpression(expressionOfReturnStatement)
            .build();
          returnOkStatementNode = new ReturnOKStatementNodeBuilder(metadataOfReturnStatement)
            .withExpression(newExpression)
            .build();
        }
        parentStatementListNode.replaceChild(returnStatementNode, returnOkStatementNode);
      }
    }
  }

  private addReturnOkVoidStatement(): void {
    const parentStatementListNode = this.node.getStatementListOfParent();
    if (parentStatementListNode) {
      const returnOKStatements = parentStatementListNode.getReturnOKStatements();
      if (returnOKStatements.length === 0 && this.node.isReturnTypeVoid()) {
        const returnOKNode = new ReturnOKStatementNodeBuilder().build();

        parentStatementListNode.addChild(returnOKNode);
      }
    }
  }

  private returnStatementIsUsedByAnonymousFunction(
    returnStatementNode: ReturnStatementNode,
  ): boolean {
    // look every parent until we find anonymous or hit root
    let currentNode: IntermediateASTNode = returnStatementNode;
    while (currentNode) {
      if (currentNode.getNodeType() === BitloopsTypesMapping.TAnonymousFunction) {
        return true;
      }
      currentNode = currentNode.getParent();
    }
    return false;
  }

  private returnStatementIsUsedByIfError(returnStatementNode: ReturnStatementNode): boolean {
    let currentNode: IntermediateASTNode = returnStatementNode;
    while (currentNode) {
      if (currentNode.getNodeType() === BitloopsTypesMapping.TIfErrorExpression) {
        return true;
      }
      currentNode = currentNode.getParent();
    }
    return false;
  }
}
