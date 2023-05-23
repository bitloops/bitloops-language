import { ArrayPrimaryTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { BitloopsIdentifierTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { BuiltInClassTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BuiltInClassTypeBuilder.js';
import { PrimitiveTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { StandardVOTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/StandardVOTypeNodeBuilder.js';
import { StandardValueTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/StandardValueTypeNodeBuilder.js';
import { BitloopsPrimaryTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import {
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
} from '../../../../../src/types.js';

export class BitloopsPrimaryTypeNodeDirector {
  buildDoubleArrayPrimitiveType(type: TBitloopsPrimitives): BitloopsPrimaryTypeNode {
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder()
      .withPrimaryType(primitiveTypeNode)
      .build();
    const doubleArrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder()
      .withPrimaryType(arrayBitloopsPrimaryTypeNode)
      .build();

    return new BitloopsPrimaryTypeBuilder()
      .withPrimaryType(doubleArrayBitloopsPrimaryTypeNode)
      .build();
  }

  buildArrayPrimitiveType(type: TBitloopsPrimitives): BitloopsPrimaryTypeNode {
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder()
      .withPrimaryType(primitiveTypeNode)
      .build();

    return new BitloopsPrimaryTypeBuilder().withPrimaryType(arrayBitloopsPrimaryTypeNode).build();
  }

  buildArrayIdentifierPrimaryType(type: TBitloopsIdentifier): BitloopsPrimaryTypeNode {
    const value = new BitloopsIdentifierTypeBuilder().withType(type).build();
    const arrayBitloopsPrimaryTypeNode = new ArrayPrimaryTypeBuilder()
      .withPrimaryType(value)
      .build();

    return new BitloopsPrimaryTypeBuilder().withPrimaryType(arrayBitloopsPrimaryTypeNode).build();
  }

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
    const buildInClassTypeNode = new BuiltInClassTypeBuilder().withType(type).build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(buildInClassTypeNode).build();
  }

  buildStandardValueObjectPrimaryType(standardVOIdentifier: string): BitloopsPrimaryTypeNode {
    const standardVOTypeNode = new StandardVOTypeNodeBuilder()
      .withValue(standardVOIdentifier)
      .build();
    const standardValueTypeNode = new StandardValueTypeNodeBuilder()
      .withValue(standardVOTypeNode)
      .build();
    return new BitloopsPrimaryTypeBuilder().withPrimaryType(standardValueTypeNode).build();
  }
}
