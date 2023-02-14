import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainEventHandlerDeclarationNode } from '../../../../ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './prependAwait.js';

export class DomainEventHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<DomainEventHandlerDeclarationNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;

  constructor(
    protected tree: IntermediateASTTree,
    protected node: DomainEventHandlerDeclarationNode,
  ) {
    super(tree, node);
    this.prependAwaitTransformer = new PrependAwaitNodeTSTransformer(node, tree);
  }

  run(): void {
    this.prependAwaitToAllDependencyCalls();
    this.tree.buildValueRecursiveBottomUp(this.node);
  }

  private prependAwaitToAllDependencyCalls(): void {
    this.prependAwaitTransformer.run();
  }
}
