import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TArgumentList,
  TDependencyInjection,
  TDependencyInjectionType,
  TDependencyInjections,
  TIdentifier,
} from '../../../../src/types.js';

export class DependencyInjectionsBuilder implements IBuilder<TDependencyInjections> {
  private dependencyInjections: TDependencyInjection[];

  public withDependencyInjection(params: {
    type: TDependencyInjectionType;
    identifier: TIdentifier;
    argumentList: TArgumentList;
  }): DependencyInjectionsBuilder {
    const { type, identifier, argumentList } = params;
    const dependencyInjection: TDependencyInjection = {
      dependencyInjection: {
        type,
        identifier,
        ...argumentList,
      },
    };
    if (!this.dependencyInjections) {
      this.dependencyInjections = [];
    }
    this.dependencyInjections.push(dependencyInjection);
    return this;
  }

  public build(): TDependencyInjections {
    const res: TDependencyInjections = {
      dependencyInjections: this.dependencyInjections,
    };
    return res;
  }
}
