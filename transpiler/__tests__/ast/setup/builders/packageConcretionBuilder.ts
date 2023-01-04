import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBoundedContextModule,
  TPackageAdapter,
  TPackageConcretion,
  TPackageAdapterIdentifier,
  TPackagePortIdentifier,
} from '../../../../src/types.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';
import { PackageAdapterIdentifierBuilder } from './packageAdapterIdentifierBuilder.js';
import { PackagePortIdentifierBuilder } from './packagePortIdentifierBuilder.js';

export class PackageConcretionBuilder implements IBuilder<TPackageConcretion> {
  private bcModule: TBoundedContextModule;
  private packageAdapterIdentifier: TPackageAdapter;
  private packagePortIdentifier: {
    ['PackagePortIdentifier']: TPackagePortIdentifier;
  };

  public withBoundedContextModule({
    boundedContextName,
    moduleName,
  }: {
    boundedContextName: string;
    moduleName: string;
  }): PackageConcretionBuilder {
    this.bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    return this;
  }

  public withPackageAdapter(
    adapterIdentifier: TPackageAdapterIdentifier,
  ): PackageConcretionBuilder {
    this.packageAdapterIdentifier = new PackageAdapterIdentifierBuilder()
      .withIdentifier(adapterIdentifier)
      .build();
    return this;
  }

  public withPackagePort(packagePortIdentifier: string): PackageConcretionBuilder {
    this.packagePortIdentifier = new PackagePortIdentifierBuilder()
      .withName(packagePortIdentifier)
      .build();
    return this;
  }

  public build(): any {
    const packageConcretion = {
      packageConcretion: {
        ...this.packagePortIdentifier,
        ...this.packageAdapterIdentifier,
        ...this.bcModule,
      },
    };
    return packageConcretion;
  }
}
