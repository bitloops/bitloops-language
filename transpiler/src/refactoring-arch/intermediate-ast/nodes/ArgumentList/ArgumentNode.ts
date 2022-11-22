import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'argument';

export class ArgumentNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TArgumentDependency, { lines }, NAME);
  }
}
