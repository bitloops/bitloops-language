import { IntermediateASTNode } from './intermediateASTNode.js';

export class IntermediateASTRootNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super('Root', lines);
  }
}
