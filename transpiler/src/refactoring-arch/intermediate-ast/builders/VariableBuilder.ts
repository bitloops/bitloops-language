import { TBitloopsPrimaryType, TVariable } from '../../../types.js';
import { IBuilder } from './IBuilder.js';

export class VariableBuilderDirector {
  private builder: VariableBuilder;

  constructor() {
    this.builder = new VariableBuilder();
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

export class VariableBuilder implements IBuilder<TVariable> {
  private optional?: boolean;
  private type: TBitloopsPrimaryType;
  private name: string;

  public withType(type: TBitloopsPrimaryType): VariableBuilder {
    this.type = type;
    return this;
  }

  public withName(name: string): VariableBuilder {
    this.name = name;
    return this;
  }

  public withOptional(optional: boolean): VariableBuilder {
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
