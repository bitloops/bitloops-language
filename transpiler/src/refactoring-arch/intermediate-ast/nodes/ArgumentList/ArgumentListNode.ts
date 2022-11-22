import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'argumentList';

export class ArgumentListNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TArgumentDependencies, { lines }, NAME);
  }
}
