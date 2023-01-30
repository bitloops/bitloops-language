import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TPackageAdapterIdentifier } from '../../../../src/types.js';

export class PackageAdapterIdentifierBuilder implements IBuilder<TPackageAdapterIdentifier> {
  private packageAdapterIdentifier: TPackageAdapterIdentifier;

  public withIdentifier(identifier: string): PackageAdapterIdentifierBuilder {
    this.packageAdapterIdentifier = identifier;
    return this;
  }

  public build(): TPackageAdapterIdentifier {
    return this.packageAdapterIdentifier;
  }
}
