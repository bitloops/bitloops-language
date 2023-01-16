import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterIdentifierNode } from './ParameterIdentifierNode.js';

const NAME = 'parameter';

export class ParameterNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TParameter, metadata, NAME);
  }

  getIdentifier(): string {
    const parameterIdentifier = this.getChildNodeByType<ParameterIdentifierNode>(
      BitloopsTypesMapping.TParameterDependencyIdentifier,
    );
    return parameterIdentifier.getIdentifier();
  }
}
