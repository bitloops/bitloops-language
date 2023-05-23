import { TBitloopsIdentifier, TBitloopsPrimitives } from '../../../../../types.js';
import { BitloopsPrimaryTypeNodeBuilderDirector } from '../../directors/BitloopsPrimaryTypeNodeBuilderDirector.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ErrorIdentifierNodeBuilder } from '../ErrorIdentifiers/ErrorIdentifierBuilder.js';
import { ErrorIdentifiersNodeBuilder } from '../ErrorIdentifiers/ErrorIdentifiersBuilder.js';
import { ReturnOkErrorTypeNodeBuilder } from './ReturnOkErrorTypeBuilder.js';
import { ReturnOkTypeNodeBuilder } from './ReturnOkTypeNodeBuilder.js';

export class ReturnOkErrorTypeNodeDirector {
  private builder: ReturnOkErrorTypeNodeBuilder;

  constructor() {
    this.builder = new ReturnOkErrorTypeNodeBuilder();
  }

  buildReturnOkErrorWithIdentifierOk(
    identifierPrimaryType: TBitloopsIdentifier,
    error: string,
  ): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(
              identifierPrimaryType,
            ),
          )
          .build(),
      )
      .withErrors(
        new ErrorIdentifiersNodeBuilder()
          .withErrors([new ErrorIdentifierNodeBuilder().withName(error).build()])
          .build(),
      )
      .build();
  }

  buildReturnOkErrorWithPrimitiveOk(
    primitive: TBitloopsPrimitives,
    error: string,
  ): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeBuilderDirector().buildPrimitivePrimaryType(primitive),
          )
          .build(),
      )
      .withErrors(
        new ErrorIdentifiersNodeBuilder()
          .withErrors([new ErrorIdentifierNodeBuilder().withName(error).build()])
          .build(),
      )
      .build();
  }

  buildReturnOkErrorWithPrimitiveOkAndNoErrors(
    identifierPrimaryType: TBitloopsIdentifier,
  ): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeBuilderDirector().buildIdentifierPrimaryType(
              identifierPrimaryType,
            ),
          )
          .build(),
      )
      .withErrors(new ErrorIdentifiersNodeBuilder().withErrors([]).build())
      .build();
  }

  buildReturnOkErrorWithArrayIdentifierOk(
    identifierPrimaryType: TBitloopsIdentifier,
    error: string,
  ): ReturnOkErrorTypeNode {
    return this.builder
      .withOk(
        new ReturnOkTypeNodeBuilder()
          .withType(
            new BitloopsPrimaryTypeNodeBuilderDirector().buildArrayIdentifierPrimaryType(
              identifierPrimaryType,
            ),
          )
          .build(),
      )
      .withErrors(
        new ErrorIdentifiersNodeBuilder()
          .withErrors([new ErrorIdentifierNodeBuilder().withName(error).build()])
          .build(),
      )
      .build();
  }

  buildReturnOkErrorWithVoidOkAndUnexpectedError(): ReturnOkErrorTypeNode {
    return this.buildReturnOkErrorWithPrimitiveOk('void', 'UnexpectedError');
  }

  buildReturnOkErrorWithIdentifierOkAndUnexpectedError(
    identifier: TBitloopsIdentifier,
  ): ReturnOkErrorTypeNode {
    return this.buildReturnOkErrorWithIdentifierOk(identifier, 'UnexpectedError');
  }

  buildReturnOkErrorWithArrayIdentifierOkAndUnexpectedError(
    identifier: TBitloopsIdentifier,
  ): ReturnOkErrorTypeNode {
    return this.buildReturnOkErrorWithArrayIdentifierOk(identifier, 'UnexpectedError');
  }
}
