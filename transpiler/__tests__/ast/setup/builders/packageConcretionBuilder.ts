import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBoundedContextModule,
  TPackageAdapterClassName,
  TPackageConcretion,
  TPackageAdapterIdentifier,
} from '../../../../src/types.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';
import { PackageAdapterClassNameBuilder } from './packageAdapterClassNameBuilder.js';
import { PackageAdapterIdentifierBuilder } from './packageAdapterIdentifierBuilder.js';

export class PackageConcretionBuilder implements IBuilder<TPackageConcretion> {
  private bcModule: TBoundedContextModule; //?
  private packageAdapterClassName: TPackageAdapterClassName;
  private packageAdapterIdentifier: TPackageAdapterIdentifier;

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

  public withPackageAdapterClassName(
    adapterIdentifier: TPackageAdapterIdentifier,
  ): PackageConcretionBuilder {
    this.packageAdapterClassName = new PackageAdapterClassNameBuilder()
      .withIdentifier(adapterIdentifier)
      .build();
    return this;
  }

  public withPackageAdapterIdentifier(packageAdapterIdentifier: string): PackageConcretionBuilder {
    this.packageAdapterIdentifier = new PackageAdapterIdentifierBuilder()
      .withName(packageAdapterIdentifier)
      .build();
    return this;
  }

  public build(): TPackageConcretion {
    const packageConcretion: TPackageConcretion = {
      packageConcretion: {
        ...this.packageAdapterClassName,
        ...this.packageAdapterIdentifier,
        ...this.bcModule,
      },
    };
    return packageConcretion;
  }
}
