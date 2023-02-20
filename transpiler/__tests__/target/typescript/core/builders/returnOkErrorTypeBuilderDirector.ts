import { ErrorIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import {
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
} from '../../../../../src/types.js';
import { BitloopsPrimaryTypeNodeDirector } from './bitloopsPrimaryTypeDirector.js';

export class ReturnOkErrorTypeBuilderDirector {
  private builder: ReturnOkErrorTypeNodeBuilder;

  constructor() {
    this.builder = new ReturnOkErrorTypeNodeBuilder();
  }

  buildReturnOkTypeBitloopsIdentifier(entityName: TBitloopsIdentifier): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(entityName))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }

  buildReturnOkTypeBitloopsIdentifierArrayType(
    entityName: TBitloopsIdentifier,
  ): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeDirector().buildArrayIdentifierPrimaryType(entityName),
          )
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }

  buildReturnOkTypePrimitiveType(primitiveType: TBitloopsPrimitives): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType(primitiveType))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }

  buildReturnOkErrorTypePrimitiveType(
    primitiveType: TBitloopsPrimitives,
    errors: string[],
  ): ReturnOkErrorTypeNode {
    const errorIdentifiersNode = [];
    for (const errorName of errors) {
      const errorNode = new ErrorIdentifierNodeBuilder().withName(errorName).build();
      errorIdentifiersNode.push(errorNode);
    }
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType(primitiveType))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors(errorIdentifiersNode).build())
      .build();
  }

  buildReturnOkErrorTypeBitloopsIdentifier(
    identifierName: TBitloopsIdentifier,
    errors: string[],
  ): ReturnOkErrorTypeNode {
    const errorIdentifiersNode = [];
    for (const errorName of errors) {
      const errorNode = new ErrorIdentifierNodeBuilder().withName(errorName).build();
      errorIdentifiersNode.push(errorNode);
    }
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeDirector().buildIdentifierPrimaryType(identifierName),
          )
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors(errorIdentifiersNode).build())
      .build();
  }

  buildReturnOkTypeBuiltInClass(builtInClass: TBitloopsBuiltInClasses): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeDirector().buildBuiltinClassPrimaryType(builtInClass),
          )
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }
}
