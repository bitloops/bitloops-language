import { IntermediateASTNode } from './IntermediateASTNode.js';

export class IntermediateASTRootNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super('Root', lines);
  }
}
