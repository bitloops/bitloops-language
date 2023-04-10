import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
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

  getType(): BitloopsPrimaryTypeNode {
    const parameterType = this.getChildNodeByType<BitloopsPrimaryTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimaryType,
    );
    return parameterType;
  }

  hasRepoPortType(): boolean {
    const parameterType = this.getType();
    return parameterType.isRepoPort();
  }
}
