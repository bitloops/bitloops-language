import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TBoundedContextModule, TBoundedContextName, TModuleName } from '../../../../src/types.js';

export class BoundedContextModuleBuilder implements IBuilder<TBoundedContextModule> {
  private boundedContext: TBoundedContextName;
  private module: TModuleName;

  public withBoundedContext(boundedContext: TBoundedContextName): BoundedContextModuleBuilder {
    this.boundedContext = boundedContext;
    return this;
  }

  public withModule(module: TModuleName): BoundedContextModuleBuilder {
    this.module = module;
    return this;
  }

  public build(): TBoundedContextModule {
    const useCaseExpression = {
      boundedContextModule: {
        boundedContextName: this.boundedContext,
        moduleName: this.module,
      },
    };

    return useCaseExpression;
  }
}
