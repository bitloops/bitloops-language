import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TPackageAdapterClassName, TPackageAdapterIdentifier } from '../../../../src/types.js';

export class PackageAdapterClassNameBuilder implements IBuilder<TPackageAdapterClassName> {
  private packageAdapterIdentifier: TPackageAdapterIdentifier;

  public withIdentifier(identifier: TPackageAdapterIdentifier): PackageAdapterClassNameBuilder {
    this.packageAdapterIdentifier = identifier;
    return this;
  }

  public build(): TPackageAdapterClassName {
    const packageAdapterClassName = {
      packageAdapterClassName: this.packageAdapterIdentifier,
    };

    return packageAdapterClassName;
  }
}
