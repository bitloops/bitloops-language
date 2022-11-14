import { TDTO, TVariables } from '../../types.js';
import { IBuilder } from './IBuilder.js';

export interface IDTOBuilder extends IBuilder<TDTO> {
  withIdentifier(identifier: string): IDTOBuilder;
  withVariables(variables: TVariables): IDTOBuilder;
}

export class DTODirector {
  private builder: IDTOBuilder;

  constructor(builder: IDTOBuilder) {
    this.builder = builder;
  }

  buildDTO(identifier: string, fields: TVariables): TDTO {
    const dto = this.builder.withIdentifier(identifier).withVariables(fields).build();
    return dto;
  }
}

export class DTOBuilder implements IDTOBuilder {
  private identifier: string;
  private variables: TVariables;

  public withIdentifier(identifier: string): IDTOBuilder {
    this.identifier = identifier;
    return this;
  }

  public withVariables(variables: TVariables): IDTOBuilder {
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
