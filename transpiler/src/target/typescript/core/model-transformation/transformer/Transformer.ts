import { IntermediateASTNode } from '../../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';

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
    this.tree.updateIdentifiersInNodes(nodes, identifierNode, { suffix: '.value' });
  }
}
