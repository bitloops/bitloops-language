import { TBitloopsIdentifier } from '../../../../../types.js';
import { BitloopsIdentifierTypeNode } from '../../nodes/BitloopsPrimaryType/BitloopsIdentifierTypeNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class BitloopsIdentifierTypeBuilder implements IBuilder<BitloopsIdentifierTypeNode> {
  private bitloopsIdentifierTypeNode: BitloopsIdentifierTypeNode;
  private type: TBitloopsIdentifier;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeNode(nodeMetadata);
  }

  public withType(type: TBitloopsIdentifier): BitloopsIdentifierTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): BitloopsIdentifierTypeNode {
    this.bitloopsIdentifierTypeNode.buildLeafValue(this.type);

    return this.bitloopsIdentifierTypeNode;
  }
}
