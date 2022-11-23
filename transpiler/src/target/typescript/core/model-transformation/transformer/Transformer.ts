import { IntermediateASTNode } from '../../../../../refactoring-arch/intermediate-ast/nodes/IntermediateASTNode.js';
import { IntermediateASTTree } from './../../../../../refactoring-arch/intermediate-ast/IntermediateASTTree.js';

class RestControllerNode extends IntermediateASTNode {}

export abstract class Transformer<Node extends IntermediateASTNode> {
  constructor(protected tree: IntermediateASTTree, protected node: Node) {}

  abstract run(): void;
}

export class RestControllerNodeTransformer extends Transformer<RestControllerNode> {
  run() {
    this.transformAwait();
    this.transformDotValue();
  }

  private transformAwait(): void {
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    const expression = executeStatement.getExpression();
    if (!expression.isMethodCallExpression()) {
      return;
    }
    expression.prependMethodName('await ');
    return;
  }

  private transformDotValue(): void {
    const identifierNode = this.tree.getUseCaseExecuteIdentifier(this.node);
    if (!identifierNode) {
      return;
    }
    const nodes = this.tree.getNodesAfterUseCaseExecute(this.node);
    console.log(nodes);
    // this.tree.replaceIdentifierInNodes(nodes, identifierNode, 'value');
  }
  // Get identifier of useCaseExecute Statement
  // Replace identifier afterwards wherever used with identifier.value
  //   const policy = (node) => {
  //     if (node instanceof StatementNode && node.isUseCaseExecuteStatementNode()) {
  //       const methodCallNode = node.getExpression() as MethodCallExpressionNode;
  //       methodCallNode.prepend('await ');
  //       useCaseExecuteFound = true;
  //       return;
  //     }
}
