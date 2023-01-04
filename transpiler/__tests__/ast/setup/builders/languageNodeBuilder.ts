import { TLanguage } from '../../../../src/types.js';
import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';

export class LanguageBuilder implements IBuilder<TLanguage> {
  private name: TLanguage;

  public withName(name: TLanguage): LanguageBuilder {
    this.name = name;
    return this;
  }

  public build(): TLanguage {
    return this.name;
  }
}
