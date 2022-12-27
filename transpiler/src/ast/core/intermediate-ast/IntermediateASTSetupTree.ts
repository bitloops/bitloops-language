import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode } from './nodes/IntermediateASTNode.js';

export class IntermediateASTSetupTree extends IntermediateASTTree {
  constructor(rootNode: IntermediateASTNode) {
    super(rootNode);
  }
}
