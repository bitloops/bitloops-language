import { ArrayPrimaryTypeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { PrimitiveTypeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { FieldNodeBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { IdentifierBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/IdentifierBuilder.js';
import { OptionalBuilder } from '../../../../../src/refactoring-arch/intermediate-ast/builders/OptionalBuilder.js';
import { FieldNode } from '../../../../../src/refactoring-arch/intermediate-ast/nodes/FieldList/FieldNode.js';
import { TBitloopsPrimitives } from '../../../../../src/types.js';

export class FieldBuilderDirector {
  private builder: FieldNodeBuilder;

  constructor() {
    this.builder = new FieldNodeBuilder();
  }

  buildOptionalPrimitiveField(name: string, type: TBitloopsPrimitives): FieldNode {
    const optionalNode = new OptionalBuilder().withOptional(true).build();
    const identifierNode = new IdentifierBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const typeNode = new BitloopsPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const fieldNode = this.builder
      .withName(identifierNode)
      .withOptional(optionalNode)
      .withType(typeNode)
      .build();
    return fieldNode;
  }

  buildRequiredPrimitiveField(name: string, type: TBitloopsPrimitives): FieldNode {
    const identifierNode = new IdentifierBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const typeNode = new BitloopsPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const fieldNode = this.builder.withName(identifierNode).withType(typeNode).build();
    return fieldNode;
  }

  buildRequiredArrayField(name: string, type: TBitloopsPrimitives): FieldNode {
    const identifierNode = new IdentifierBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const arrayTypeNode = new ArrayPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const typeNode = new BitloopsPrimaryTypeBuilder().withPrimaryType(arrayTypeNode).build();
    const fieldNode = this.builder.withName(identifierNode).withType(typeNode).build();
    return fieldNode;
  }

  buildRequiredArrayFieldDoubleDimension(name: string, type: TBitloopsPrimitives): FieldNode {
    const identifierNode = new IdentifierBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const arrayTypeNode = new ArrayPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const arrayTypeNodeDoubleDimension = new ArrayPrimaryTypeBuilder()
      .withPrimaryType(arrayTypeNode)
      .build();
    const typeNode = new BitloopsPrimaryTypeBuilder()
      .withPrimaryType(arrayTypeNodeDoubleDimension)
      .build();
    const fieldNode = this.builder.withName(identifierNode).withType(typeNode).build();
    return fieldNode;
  }
}
