import { ArrayPrimaryTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/ArrayPrimaryTypeBuilder.js';
import { BitloopsIdentifierTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsIdentifierTypeBuilder.js';
import { BitloopsPrimaryTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/BitloopsPrimaryTypeBuilder.js';
import { PrimitiveTypeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/BitloopsPrimaryType/PrimitiveTypeBuilder.js';
import { FieldNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { OptionalBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/OptionalBuilder.js';
import { FieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { TBitloopsBuiltInClasses, TBitloopsPrimitives } from '../../../../../src/types.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';

export class FieldBuilderDirector {
  private builder: FieldNodeBuilder;

  constructor() {
    this.builder = new FieldNodeBuilder();
  }

  buildOptionalPrimitiveField(name: string, type: TBitloopsPrimitives): FieldNode {
    const optionalNode = new OptionalBuilder().withOptional(true).build();
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
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
    const optionalNode = new OptionalBuilder().withOptional(false).build();
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const typeNode = new BitloopsPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const fieldNode = this.builder
      .withName(identifierNode)
      .withType(typeNode)
      .withOptional(optionalNode)
      .build();
    return fieldNode;
  }

  buildStandardVOField(name: string, standardVOIdentifier: string, optional: boolean): FieldNode {
    {
      const typeNode = new BitloopsPrimaryTypeNodeDirector().buildStandardValueObjectPrimaryType(
        standardVOIdentifier,
      );

      const optionalNode = new OptionalBuilder().withOptional(optional).build();
      const identifierNode = new IdentifierNodeBuilder().withName(name).build();
      const fieldNode = this.builder
        .withName(identifierNode)
        .withType(typeNode)
        .withOptional(optionalNode)
        .build();
      return fieldNode;
    }
  }

  buildRequiredArrayField(name: string, type: TBitloopsPrimitives): FieldNode {
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
    const primitiveTypeNode = new PrimitiveTypeBuilder().withType(type).build();
    const arrayTypeNode = new ArrayPrimaryTypeBuilder().withPrimaryType(primitiveTypeNode).build();
    const typeNode = new BitloopsPrimaryTypeBuilder().withPrimaryType(arrayTypeNode).build();
    const fieldNode = this.builder.withName(identifierNode).withType(typeNode).build();
    return fieldNode;
  }

  buildRequiredArrayFieldDoubleDimension(name: string, type: TBitloopsPrimitives): FieldNode {
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
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

  buildRequiredBuiltInClassField(name: string, type: TBitloopsBuiltInClasses): FieldNode {
    const optionalNode = new OptionalBuilder().withOptional(false).build();
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
    const primaryType = new BitloopsPrimaryTypeNodeDirector().buildBuiltinClassPrimaryType(type);
    const fieldNode = this.builder
      .withName(identifierNode)
      .withOptional(optionalNode)
      .withType(primaryType)
      .build();
    return fieldNode;
  }

  buildOptionalBuiltInClassField(name: string, type: TBitloopsBuiltInClasses): FieldNode {
    const optionalNode = new OptionalBuilder().withOptional(true).build();
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
    const primaryType = new BitloopsPrimaryTypeNodeDirector().buildBuiltinClassPrimaryType(type);
    const fieldNode = this.builder
      .withName(identifierNode)
      .withOptional(optionalNode)
      .withType(primaryType)
      .build();
    return fieldNode;
  }

  buildRequiredBitloopsIdentifierTypeField(name: string, type: string): FieldNode {
    const identifierNode = new IdentifierNodeBuilder().withName(name).build();
    const bitloopsIdentifierType = new BitloopsPrimaryTypeBuilder()
      .withPrimaryType(new BitloopsIdentifierTypeBuilder().withType(type).build())
      .build();
    const fieldNode = this.builder
      .withName(identifierNode)
      .withType(bitloopsIdentifierType)
      .build();
    return fieldNode;
  }
}
