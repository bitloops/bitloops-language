import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

const NAME = 'buildInClassType';

export class BuildInClassTypeNode extends BitloopsPrimaryTypeNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TBitloopsBuildInClasses, { lines }, NAME);
  }
}
