import { ErrorIdentifiersNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/returnOkErrorType/ReturnOkTypeNodeBuilder.js';
import { ReturnOkErrorTypeNode } from '../../../../../src/ast/core/intermediate-ast/nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { TBitloopsPrimitives } from '../../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';

export class ReturnOkErrorTypeBuilderDirector {
  private builder: ReturnOkErrorTypeNodeBuilder;

  constructor() {
    this.builder = new ReturnOkErrorTypeNodeBuilder();
  }

  buildReturnOkTypeBitloopsIdentifier(entityName: string): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(entityName))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }

  buildReturnOkTypePrimitiveType(primitiveType: TBitloopsPrimitives): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(primitiveType))
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }
}