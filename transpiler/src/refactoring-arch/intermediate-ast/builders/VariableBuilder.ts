import { TBitloopsPrimaryType, TVariable } from '../../../types.js';
import { IBuilder } from './IBuilder.js';

export interface IVariableBuilder extends IBuilder<TVariable> {
  withType(type: TBitloopsPrimaryType): IVariableBuilder;
  withName(name: string): IVariableBuilder;
  withOptional(optional: boolean): IVariableBuilder;
}

export class VariableBuilderDirector {
  private builder: IVariableBuilder;

  constructor(builder: IVariableBuilder) {
    this.builder = builder;
  }

  buildVariable(type: TBitloopsPrimaryType, name: string): TVariable {
    const variable = this.builder.withType(type).withName(name).build();
    return variable;
  }

  buildOptionalVariable(type: TBitloopsPrimaryType, name: string): TVariable {
    const variable = this.builder.withType(type).withName(name).withOptional(true).build();
    return variable;
  }
}

export class VariableBuilder implements IVariableBuilder {
  private optional?: boolean;
  private type: TBitloopsPrimaryType;
  private name: string;

  public withType(type: TBitloopsPrimaryType): IVariableBuilder {
    this.type = type;
    return this;
  }

  public withName(name: string): IVariableBuilder {
    this.name = name;
    return this;
  }

  public withOptional(optional: boolean): IVariableBuilder {
    this.optional = optional;
    return this;
  }

  public build(): TVariable {
    const variable: TVariable = {
      name: this.name,
      type: this.type,
    };
    if (this.optional) {
      variable.optional = this.optional;
    }
    return variable;
  }
}
