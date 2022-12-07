import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TReadModel, TReadModelIdentifier, TVariable, TVariables } from '../../../../src/types.js';

export class ReadModelBuilder implements IBuilder<TReadModel> {
  private identifierName: TReadModelIdentifier;
  private fields: TVariables;

  public withIdentifier(identifierName: TReadModelIdentifier): ReadModelBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withFields(fields: TVariables): ReadModelBuilder {
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
        ReadModelIdentifier: this.identifierName,
        fields: this.fields,
      },
    };
  }
}
