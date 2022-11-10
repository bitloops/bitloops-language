import { TDTO, TVariables } from '../types.js';

export interface IDTODirector {
  buildDTO(identifier: string, variables: TVariables): TDTO;
}

export interface IBuilder<T> {
  build(): T;
}

export interface IDTOBuilder extends IBuilder<TDTO> {
  withIdentifier(identifier: string): IDTOBuilder;
  withVariables(variables: TVariables): IDTOBuilder;
}

export class DTODirector implements IDTODirector {
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

  withIdentifier(identifier: string): IDTOBuilder {
    this.identifier = identifier;
    return this;
  }

  withVariables(variables: TVariables): IDTOBuilder {
    this.variables = variables;
    return this;
  }

  build(): TDTO {
    return {
      [this.identifier]: {
        fields: this.variables,
      },
    };
  }
}
