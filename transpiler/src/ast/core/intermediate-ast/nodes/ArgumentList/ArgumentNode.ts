import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'argument';

export class ArgumentNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArgumentDependency, metadata, NAME);
  }
}
