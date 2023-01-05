import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRepoAdapterExpression,
  TRepoAdapterClassName,
  TRepoAdapterOptions,
  TConcretedRepoPort,
  TBoundedContextModule,
  repoAdapterExpressionKey,
  concretedRepoPortKey,
  repoAdapterClassNameKey,
  TRepoSupportedTypes,
  repoAdapterOptionsKey,
  TEvaluationFields,
} from '../../../../src/types.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';

export class RepoAdapterExpressionBuilder implements IBuilder<TRepoAdapterExpression> {
  private repoAdapterClassName: TRepoAdapterClassName;
  private repoAdapterOptions: TRepoAdapterOptions;
  private concretedRepoPort: TConcretedRepoPort;
  private bcModule: TBoundedContextModule;

  public withBoundedContextModule({
    boundedContextName,
    moduleName,
  }: {
    boundedContextName: string;
    moduleName: string;
  }): RepoAdapterExpressionBuilder {
    this.bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    return this;
  }

  public withOptions(options: TEvaluationFields): RepoAdapterExpressionBuilder {
    this.repoAdapterOptions = { [repoAdapterOptionsKey]: options };
    return this;
  }

  public withClassName(dbType: TRepoSupportedTypes): RepoAdapterExpressionBuilder {
    this.repoAdapterClassName = { [repoAdapterClassNameKey]: { dbType: dbType } };
    return this;
  }

  public withConcretedRepoPort(
    concretedRepoPort: TConcretedRepoPort,
  ): RepoAdapterExpressionBuilder {
    this.concretedRepoPort = concretedRepoPort;
    return this;
  }

  public build(): TRepoAdapterExpression {
    const repoAdapterExpression: TRepoAdapterExpression = {
      [repoAdapterExpressionKey]: {
        [concretedRepoPortKey]: this.concretedRepoPort,
        ...this.repoAdapterClassName,
        ...this.repoAdapterOptions,
        ...this.bcModule,
      },
    };

    return repoAdapterExpression;
  }
}
