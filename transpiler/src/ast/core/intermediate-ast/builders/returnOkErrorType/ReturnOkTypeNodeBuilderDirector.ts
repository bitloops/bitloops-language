import { TBitloopsIdentifier } from '../../../../../types.js';
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
}
