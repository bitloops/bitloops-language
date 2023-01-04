import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TPackageAdapterIdentifier } from '../../../../src/types.js';

export class PackageAdapterIdentifierBuilder implements IBuilder<TPackageAdapterIdentifier> {
  private name: string;

  public withName(name: string): PackageAdapterIdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): TPackageAdapterIdentifier {
    const packageAdapterIdentifier = {
      packageAdapterIdentifier: this.name,
    };

    return packageAdapterIdentifier;
  }
}
