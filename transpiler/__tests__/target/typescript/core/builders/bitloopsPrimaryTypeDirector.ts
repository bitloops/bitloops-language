import { BitloopsIdentifierTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { BuildInClassTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BuildInClassTypeBuilder.js';
import { PrimitiveTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import {
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
} from '../../../../../src/types.js';

export class BitloopsPrimaryTypeDirector {
  // buildArrayPrimaryType(type: TBitloopsPrimitives): BitloopsPrimaryTypeNode {
  //   const value = this.buildPrimitivePrimaryType(type);
  //   const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder()
  //     .withPrimaryType(value)
  //     .build();

  //   return new BitloopsPrimaryTypeBuilder().withPrimaryType(arrayBitloopsPrimaryTypeNode).build();
  // }

  buildPrimitivePrimaryType(primitiveType: TBitloopsPrimitives): BitloopsPrimaryTypeNode {
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(primitiveType).build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
  }

  buildIdentifierPrimaryType(identifier: TBitloopsIdentifier): BitloopsPrimaryTypeNode {
    const bitloopsIdentifierTypeNode = new BitloopsIdentifierTypeBuilder()
      .withType(identifier)
      .build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(bitloopsIdentifierTypeNode).build();
  }

  buildBuiltinClassPrimaryType(type: TBitloopsBuiltInClasses): BitloopsPrimaryTypeNode {
    const buildInClassTypeNode = new BuildInClassTypeBuilder().withType(type).build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(buildInClassTypeNode).build();
  }
}
