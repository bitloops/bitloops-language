import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'Root';
const NODE_TYPE = 'Root';

export class IntermediateASTRootNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(NODE_TYPE, { lines }, NAME);
  }
}
