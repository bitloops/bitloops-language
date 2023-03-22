import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

const NAME = 'className';
export class ClassNameNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TClassName, metadata, NAME);
  }
}
