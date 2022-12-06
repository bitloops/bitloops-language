import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBitloopsPrimaryType,
  TErrorIdentifiers,
  TOkErrorReturnType,
} from '../../../../src/types.js';

export class ReturnOkErrorTypeBuilder implements IBuilder<TOkErrorReturnType> {
  private okType: TBitloopsPrimaryType;
  private errors: TErrorIdentifiers;

  public withOk(okType: TBitloopsPrimaryType): ReturnOkErrorTypeBuilder {
    this.okType = okType;
    return this;
  }

  public withErrors(errors: TErrorIdentifiers): ReturnOkErrorTypeBuilder {
    this.errors = errors;
    return this;
  }

  public build(): TOkErrorReturnType {
    const returnOkErrorType = {
      returnType: {
        ok: {
          type: this.okType,
        },
        errors: this.errors,
      },
    };

    return returnOkErrorType;
  }
}
