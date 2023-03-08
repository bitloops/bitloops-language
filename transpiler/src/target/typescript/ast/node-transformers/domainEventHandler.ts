import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainEventHandlerDeclarationNode } from '../../../../ast/core/intermediate-ast/nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';

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
  }

  private prependAwaitToAllDependencyCalls(): void {
    const extraDependencies = this.node.getExtraDependencies();
    this.prependAwaitTransformer.prependAwaitToAllDependencyCalls(extraDependencies);
  }
}
