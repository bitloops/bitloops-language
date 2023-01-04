import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TConfigInvocation, TLanguage } from '../../../../src/types.js';

export class ConfigInvocationBuilder implements IBuilder<TConfigInvocation> {
  private language: TLanguage;

  public withLanguage(language: TLanguage): ConfigInvocationBuilder {
    this.language = language;
    return this;
  }

  public build(): TConfigInvocation {
    const configInvocation: TConfigInvocation = {
      configInvocation: {
        language: this.language,
      },
    };
    return configInvocation;
  }
}
