import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TPackagePortIdentifier } from '../../../../src/types.js';

export class PackagePortIdentifierBuilder implements IBuilder<TPackagePortIdentifier> {
  private packagePortIdentifier: string;

  public withName(identifier: string): PackagePortIdentifierBuilder {
    this.packagePortIdentifier = identifier;
    return this;
  }

  public build(): TPackagePortIdentifier {
    return this.packagePortIdentifier;
  }
}
