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
    boundedContext: string;
    module: string;
  }): DependencyInjectionsBuilder {
    const { type, identifier, argumentList, boundedContext, module } = params;
    const dependencyInjection: TDependencyInjection = {
      dependencyInjection: {
        type,
        identifier,
        boundedContextModule: {
          boundedContextName: {
            wordsWithSpaces: boundedContext,
          },
          moduleName: {
            wordsWithSpaces: module,
          },
        },
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
