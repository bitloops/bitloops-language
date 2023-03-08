import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  methodDefinitionListKey,
  TDefinitionMethodInfo,
  TDefinitionMethods,
  TServicePort,
  TServicePortIdentifier,
} from '../../../../src/types.js';

export class ServicePortBuilder implements IBuilder<TServicePort> {
  private definitionMethods: TDefinitionMethods = {
    methodDefinitionList: [],
  };
  private servicePortIdentifier: TServicePortIdentifier;

  public withIdentifier(identifierName: TServicePortIdentifier): ServicePortBuilder {
    this.servicePortIdentifier = identifierName;
    return this;
  }

  public withDefinitionMethods(definitionMethods: TDefinitionMethods): ServicePortBuilder {
    this.definitionMethods = definitionMethods;
    return this;
  }

  /**
   * Can be used to add a single definition method to the definition methods.
   */
  public withDefinitionMethod(definitionMethod: TDefinitionMethodInfo): ServicePortBuilder {
    this.definitionMethods[methodDefinitionListKey].push(definitionMethod);
    return this;
  }

  public build(): TServicePort {
    return {
      ServicePort: {
        ServicePortIdentifier: this.servicePortIdentifier,
        ...this.definitionMethods,
      },
    };
  }
}
