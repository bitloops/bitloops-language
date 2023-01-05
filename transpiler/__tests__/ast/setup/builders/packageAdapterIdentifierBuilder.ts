import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TPackageAdapter, TPackageAdapterIdentifier } from '../../../../src/types.js';

export class PackageAdapterIdentifierBuilder implements IBuilder<TPackageAdapter> {
  private packageAdapterIdentifier: TPackageAdapterIdentifier;

  public withIdentifier(identifier: TPackageAdapterIdentifier): PackageAdapterIdentifierBuilder {
    this.packageAdapterIdentifier = identifier;
    return this;
  }

  public build(): TPackageAdapter {
    const packageAdapter = {
      packageAdapterIdentifier: this.packageAdapterIdentifier,
    };

    return packageAdapter;
  }
}
