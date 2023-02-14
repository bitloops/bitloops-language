import { TBitloopsIdentifier } from '../../../../types.js';
import { BitloopsIdentifierTypeBuilder } from '../builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';

export class BitloopsPrimaryTypeDirector {
  static buildIdentifierPrimaryType(identifier: TBitloopsIdentifier): BitloopsPrimaryTypeNode {
    const bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeBuilder()
      .withType(identifier)
      .build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(bitloopsIdentifierTypeNode).build();
  }
}
