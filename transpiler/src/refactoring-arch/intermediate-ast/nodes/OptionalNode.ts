import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'optional';

export class OptionalNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TOptional, { lines }, NAME);
  }
}
