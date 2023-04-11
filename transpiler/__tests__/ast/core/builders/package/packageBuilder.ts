import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  PackagePortIdentifierKey,
  TPackage,
  TPackageIdentifier,
  TPackagePort,
} from '../../../../../src/types.js';

export class PackageBuilder implements IBuilder<TPackage> {
  private port: TPackagePort;

  public withPort(port: TPackagePort): PackageBuilder {
    this.port = port;
    return this;
  }

  public build(): TPackage {
    return {
      Package: {
        PackageIdentifier: this.generatePackageIdentifier(),
        port: this.port,
      },
    };
  }

  private generatePackageIdentifier(): TPackageIdentifier {
    return this.port[PackagePortIdentifierKey].replace('Port', '');
  }
}
