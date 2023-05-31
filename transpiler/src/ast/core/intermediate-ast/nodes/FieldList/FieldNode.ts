import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TBitloopsPrimaryTypeValues } from '../../../../../types.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { OptionalNode } from '../OptionalNode.js';

const NAME = 'field';

export class FieldNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariable, metadata, NAME);
  }

  isOptional(): boolean {
    const optionalNode = this.getChildNodeByType<OptionalNode>(BitloopsTypesMapping.TOptional);
    if (!optionalNode) return false;
    return optionalNode.isOptional();
  }

  getIdentifierNode(): IdentifierNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TIdentifier);
  }

  getTypeNode(): BitloopsPrimaryTypeNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TBitloopsPrimaryType);
  }

  getIdentifierValue(): string {
    return this.getIdentifierNode().getValue().identifier;
  }

  getTypeValue(): TBitloopsPrimaryTypeValues {
    return this.getTypeNode().getValue().type;
  }

  isPrimitiveField(): boolean {
    const typeNode = this.getTypeNode();
    return typeNode.isPrimitiveType() || typeNode.isPrimaryWithPrimitiveTypeChild();
  }

  isBitloopsIdentifierField(): boolean {
    const typeNode = this.getTypeNode();
    return (
      typeNode.isBitloopsIdentifierType() || typeNode.isPrimaryWithBitloopsIdentifierTypeChild()
    );
  }
}
