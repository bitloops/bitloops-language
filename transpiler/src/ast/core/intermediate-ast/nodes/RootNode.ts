import { IntermediateASTNode, ROOT_TYPE } from './IntermediateASTNode.js';

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
  private static rootName = 'Root';

  constructor() {
    super(ROOT_TYPE, ROOT_METADATA, IntermediateASTRootNode.rootName);
  }
}
