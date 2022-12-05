import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'value';

export class ParameterIdentifierNode extends IntermediateASTNode {
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TParameterDependencyIdentifier, metadata, NAME);
  }
}
