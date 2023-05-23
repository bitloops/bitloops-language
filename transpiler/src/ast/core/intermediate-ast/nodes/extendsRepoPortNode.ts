import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IdentifierNode } from './identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

const NAME = 'extendsRepoPorts';
export class ExtendsRepoPortsNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TExtendsRepoPorts, metadata, NAME);
  }

  getIdentifiers(): IdentifierNode[] {
    return this.getChildren() as IdentifierNode[];
  }
}
