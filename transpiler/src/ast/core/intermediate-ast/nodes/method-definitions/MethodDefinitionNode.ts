import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';

const NAME = 'methodDefinition';
export class MethodDefinitionNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDefinitionMethodInfo, metadata, NAME);
  }

  getReturnOkErrorTypeNode(): ReturnOkErrorTypeNode | null {
    return this.getChildNodeByType<ReturnOkErrorTypeNode>(BitloopsTypesMapping.TOkErrorReturnType);
  }

  getBitloopsPrimaryTypeNode(): BitloopsPrimaryTypeNode | null {
    return this.getChildNodeByType<BitloopsPrimaryTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimaryType,
    );
  }

  getIdentifierNode(): IdentifierNode {
    return this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
  }

  getTypeNode(): BitloopsPrimaryTypeNode | ReturnOkErrorTypeNode {
    return this.getReturnOkErrorTypeNode() ?? this.getBitloopsPrimaryTypeNode();
  }
}
