import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

const NAME = 'class';
export class ClassNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TClass, metadata, NAME);
  }
}
