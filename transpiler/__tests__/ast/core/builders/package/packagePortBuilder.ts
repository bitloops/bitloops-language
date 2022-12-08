import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDefinitionMethodInfo,
  TDefinitionMethods,
  TPackagePort,
  TPackagePortIdentifier,
} from '../../../../../src/types.js';

export class PackagePortBuilder implements IBuilder<TPackagePort> {
  private definitionMethods: TDefinitionMethods = [];
  private packagePortIdentifier: TPackagePortIdentifier;

  public withIdentifier(identifierName: TPackagePortIdentifier): PackagePortBuilder {
    this.packagePortIdentifier = identifierName;
    return this;
  }

  public withDefinitionMethods(definitionMethods: TDefinitionMethods): PackagePortBuilder {
    this.definitionMethods = definitionMethods;
    return this;
  }

  /**
   * Can be used to add a single definition method to the definition methods.
   */
  public withDefinitionMethod(definitionMethod: TDefinitionMethodInfo): PackagePortBuilder {
    this.definitionMethods.push(definitionMethod);
    return this;
  }

  public build(): TPackagePort {
    return {
      PackagePortIdentifier: this.packagePortIdentifier,
      methodDefinitionList: this.definitionMethods,
    };
  }
}
