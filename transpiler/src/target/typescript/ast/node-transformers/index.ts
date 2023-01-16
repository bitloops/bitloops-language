import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTNode } from '../../../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';

export interface INodeModelToASTTargetASTTransformer {
  run(): void;
}

export abstract class NodeModelToTargetASTTransformer<Node extends IntermediateASTNode>
  implements INodeModelToASTTargetASTTransformer
{
  constructor(protected tree: IntermediateASTTree, protected node: Node) {}

  abstract run(): void;
}
