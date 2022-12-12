import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'Root';
const NODE_TYPE = 'Root';
const ROOT_METADATA = {
  start: {
    line: -1,
    column: -1,
  },
  end: {
    line: -1,
    column: -1,
  },
};

export class IntermediateASTRootNode extends IntermediateASTNode {
  constructor() {
    super(NODE_TYPE as any, ROOT_METADATA, NAME);
  }
}
