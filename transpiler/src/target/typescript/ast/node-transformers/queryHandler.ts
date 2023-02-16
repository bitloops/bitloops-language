import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { QueryHandlerNode } from '../../../../ast/core/intermediate-ast/nodes/query/QueryHandlerNode.js';

export class QueryHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<QueryHandlerNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: QueryHandlerNode) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
  }

  run(): void {
    this.prependAwaitToAllDependencyCalls();
  }

  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls();
  }
}
