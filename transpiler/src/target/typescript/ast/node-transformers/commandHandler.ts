import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { NodeModelToTargetASTTransformer } from './index.js';
import { PrependAwaitNodeTSTransformer } from './generic/prependAwait.js';
import { CommandHandlerNode } from '../../../../ast/core/intermediate-ast/nodes/command/CommandHandlerNode.js';

export class CommandHandlerNodeTSTransformer extends NodeModelToTargetASTTransformer<CommandHandlerNode> {
  private prependAwaitTransformer: PrependAwaitNodeTSTransformer;

  constructor(protected tree: IntermediateASTTree, protected node: CommandHandlerNode) {
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
