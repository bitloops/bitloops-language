import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'operator';

export class OperatorNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.Toperator, { lines }, NAME);
  }
}
