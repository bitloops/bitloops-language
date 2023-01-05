import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TReadModel, TReadModelIdentifier, TVariable } from '../../../../src/types.js';

export class ReadModelBuilder implements IBuilder<TReadModel> {
  private identifierName: TReadModelIdentifier;
  private fields: TVariable[];

  public withIdentifier(identifierName: TReadModelIdentifier): ReadModelBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withFields(fields: TVariable[]): ReadModelBuilder {
    this.fields = fields;
    return this;
  }

  public withField(field: TVariable): ReadModelBuilder {
    if (!this.fields) {
      this.fields = [];
    }
    this.fields.push(field);
    return this;
  }

  public build(): TReadModel {
    return {
      ReadModel: {
        readModelIdentifier: this.identifierName,
        fields: this.fields,
      },
    };
  }
}
