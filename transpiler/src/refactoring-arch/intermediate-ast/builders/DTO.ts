import { TDTO, TVariables } from '../../../types.js';
import { IBuilder } from './IBuilder.js';

export class DTOBuilder implements IBuilder<TDTO> {
  private identifier: string;
  private variables: TVariables;

  public withIdentifier(identifier: string): DTOBuilder {
    this.identifier = identifier;
    return this;
  }

  public withVariables(variables: TVariables): DTOBuilder {
    this.variables = variables;
    return this;
  }

  public build(): TDTO {
    return {
      [this.identifier]: {
        fields: this.variables,
      },
    };
  }
}
