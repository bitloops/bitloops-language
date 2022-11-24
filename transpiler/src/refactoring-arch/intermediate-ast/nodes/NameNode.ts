import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'name';
export class NameNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TName, { lines }, NAME);
  }
}
