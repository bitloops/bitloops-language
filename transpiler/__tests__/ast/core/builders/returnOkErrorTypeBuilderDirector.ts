import { TBitloopsIdentifier, TOkErrorReturnType } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';
import { ReturnOkErrorTypeBuilder } from './returnOkErrorType.js';

export class ReturnOkErrorTypeBuilderDirector {
  private builder: ReturnOkErrorTypeBuilder;

  constructor() {
    this.builder = new ReturnOkErrorTypeBuilder();
  }

  buildReturnOkErrorWithIdentifierOk(
    identifierPrimaryType: TBitloopsIdentifier,
    error: string,
  ): TOkErrorReturnType {
    return this.builder
      .withOk(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(identifierPrimaryType))
      .withErrors([{ error }])
      .build();
  }
}
