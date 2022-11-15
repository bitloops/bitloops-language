import { IntermediateASTNode } from './nodes/intermediateASTNode.js';
import { IntermediateASTRootNode } from './nodes/RootNode.js';

export class IntermediateASTTree {
  private currentNode: IntermediateASTNode;
  private rootNode: IntermediateASTRootNode;

  constructor(rootNode: IntermediateASTRootNode) {
    this.rootNode = rootNode;
  }

  /**
   * It inserts its child to currentNode
   * and makes it the new currentNode
   */
  public insertChild(childNode: IntermediateASTNode): void {
    this.currentNode.addChild(childNode);
    this.currentNode = childNode;
  }

  /**
   * It inserts the node as child to the parent of the currentNode
   * and makes it the new currentNode
   */
  public insertSibling(siblingNode: IntermediateASTNode): void {
    const parentNode = this.currentNode.getParent();
    parentNode.addChild(siblingNode);
    this.currentNode = siblingNode;
  }

  /**
   * Sets the CurrentNode back to RootNode
   */
  public setCurrentNodeToRoot() {
    this.currentNode = this.rootNode;
  }

  // private getContextNodesByType(
  //   nodeType: NODE_TYPES,
  //   contextNode: IntermediateASTNode,
  // ): IntermediateASTNode<nodeType>[] {
  //   const children = contextNode.getChildren();
  //   for (const child of children) {
  //     if (nodeType === child.getType()) {
  //     }
  //   }

  //   while (children.length != 0) {
  //     for (const child of children) {
  //       if (nodeType === child.getType()) {
  //       }
  //       children = child.getChildren();
  //     }
  //   }
  // }

  private traverse() {
    // ignore root -- root acts as a container
    let node = this.rootNode.getFirstChild();
    while (node != null) {
      if (node.hasChildren()) {
        node = node.getFirstChild();
      } else {
        // leaf, find the parent level
        while (node.getNextSibling() == null && node != this.rootNode) {
          // use child-parent link to get to the parent level
          node = node.getParent();
        }
        node = node.getNextSibling();
      }
    }
  }

  // public getAllUseCases(): IntermediateASTNode[] {
  //   return this.findNodes(NODE_TYPES.USE_CASE);
  // }

  // public getAllExpressionsOfUseCase(): ExpressionNode[] {
  //   const useCases = this.getAllUseCases();
  //   const expressions: ExpressionNode[] = [];
  //   for (const useCase of useCases) {
  //     const expressionNodes = this.getContextNodesByType(NODE_TYPES.EXPRESSION, useCase);
  //     expressions.push(...expressionNodes);
  //   }
  //   return expressions;
  // }
}
