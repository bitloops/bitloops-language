import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'value';

export class ParameterIdentifierNode extends IntermediateASTIdentifierNode {
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TParameterDependencyIdentifier, NAME, metadata);
  }

  getIdentifier(): string {
    return this.getValue()[this.getClassNodeName()];
  }
}
