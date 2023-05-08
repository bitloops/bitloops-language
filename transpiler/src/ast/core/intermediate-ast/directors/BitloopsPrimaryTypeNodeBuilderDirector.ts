/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { TBitloopsIdentifier, TBitloopsPrimitives } from '../../../../types.js';
import { ArrayPrimaryTypeBuilder } from '../builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { BitloopsIdentifierTypeBuilder } from '../builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { PrimitiveTypeBuilder } from '../builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';

export class BitloopsPrimaryTypeNodeBuilderDirector {
  private builder: BitloopsPrimaryTypeBuilder;
  private metadata: TNodeMetadata;

  constructor(metadata?: TNodeMetadata) {
    this.builder = new BitloopsPrimaryTypeBuilder(metadata);
    this.metadata = metadata;
  }

  buildIdentifierPrimaryType(identifier: TBitloopsIdentifier): BitloopsPrimaryTypeNode {
    const bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeBuilder(this.metadata)
      .withType(identifier)
      .build();
    return this.builder.withPrimaryType(bitloopsIdentifierTypeNode).build();
  }

  buildPrimitivePrimaryType(primitive: TBitloopsPrimitives): BitloopsPrimaryTypeNode {
    const bitloopsPrimitiveTypeNode = new PrimitiveTypeBuilder(this.metadata)
      .withType(primitive)
      .build();
    return this.builder.withPrimaryType(bitloopsPrimitiveTypeNode).build();
  }

  buildArrayIdentifierPrimaryType(identifier: TBitloopsIdentifier): BitloopsPrimaryTypeNode {
    const identifierPrimaryTypeNode = this.buildIdentifierPrimaryType(identifier);
    const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder(this.metadata)
      .withPrimaryType(identifierPrimaryTypeNode)
      .build();
    return new BitloopsPrimaryTypeBuilder(this.metadata)
      .withPrimaryType(arrayBitloopsPrimaryTypeNode)
      .build();
  }
}
