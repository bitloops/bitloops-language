import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

const NAME = 'buildInClassType';

export class BuildInClassTypeNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsBuildInClasses, { lines }, NAME);
  }
}
