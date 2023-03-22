import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export interface IASTToCompletedASTTransformer {
  run(): void;
}

export abstract class NodeModelToTargetASTTransformer<Node extends IntermediateASTNode>
  implements IASTToCompletedASTTransformer
{
  constructor(protected tree: IntermediateASTTree, protected node: Node) {}

  abstract run(): void;
}
