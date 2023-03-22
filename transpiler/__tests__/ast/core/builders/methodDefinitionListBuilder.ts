import { TDefinitionMethodInfo, TDefinitionMethods } from '../../../../src/types.js';
import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';

export class MethodDefinitionListBuilder implements IBuilder<TDefinitionMethods> {
  private methodDefinitions: TDefinitionMethodInfo[];
  withMethodDefinitions(methodDefinitions: TDefinitionMethodInfo[]): MethodDefinitionListBuilder {
    this.methodDefinitions = methodDefinitions;
    return this;
  }

  build(): TDefinitionMethods {
    return {
      methodDefinitionList: this.methodDefinitions,
    };
  }
}
