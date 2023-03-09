import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { ControllerNode } from '../../../../../ast/core/intermediate-ast/nodes/controllers/ControllerNode.js';
import { GraphQLControllerNode } from '../../../../../ast/core/intermediate-ast/nodes/controllers/graphql/GraphQLControllerNode.js';
import { RESTControllerNode } from '../../../../../ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { PrependAwaitNodeTSTransformer } from '../generic/prependAwait.js';
import { NodeModelToTargetASTTransformer } from '../index.js';

class BaseControllerNodeTSTransformer<
  T extends ControllerNode,
> extends NodeModelToTargetASTTransformer<T> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: T) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
  }
  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.transformDotValue();
  }

  private prependAwaitToAllDependencyCalls(): void {
    const extraDependencies = this.node.getExtraDependencies() ?? [];
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls(extraDependencies);
  }

  private transformDotValue(): void {
    const executeStatement = this.tree.getUseCaseExecuteStatementOf(this.node);
    if (!executeStatement) {
      return;
    }

    if (executeStatement.isExpressionNode()) {
      return;
    }
    const identifierNode = executeStatement.getIdentifier();
    const identifierValue = identifierNode.getIdentifierName();
    const identifierWithAppendedDotValue = this.appendDotValue(identifierValue);

    this.tree.updateIdentifierExpressionNodesAfterStatement(
      executeStatement,
      identifierValue,
      identifierWithAppendedDotValue,
    );
  }

  private appendDotValue(str: string): string {
    return `${str}.value`;
  }
}

export class RestControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<RESTControllerNode> {}
export class GraphQLControllerNodeTSTransformer extends BaseControllerNodeTSTransformer<GraphQLControllerNode> {}
