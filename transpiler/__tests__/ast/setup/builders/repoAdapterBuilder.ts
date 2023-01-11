import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  identifierKey,
  TIdentifier,
  TRepoAdapterExpression,
  TConcretedRepoPort,
  TRepoSupportedTypes,
  TEvaluationFields,
  TRepoAdapter,
  repoAdapterKey,
} from '../../../../src/types.js';
import { RepoAdapterExpressionBuilder } from './repoAdapterExpressionBuilder.js';

export class RepoAdapterBuilder implements IBuilder<TRepoAdapter> {
  private repoIdentifier: TIdentifier;
  private repoAdapterExpression: TRepoAdapterExpression;

  public withIdentifier(repoIdentifier: TIdentifier): RepoAdapterBuilder {
    this.repoIdentifier = repoIdentifier;
    return this;
  }

  public withExpression({
    dbType,
    options,
    boundedContextName,
    moduleName,
    concretedRepoPort,
    className,
    connectionOptions,
  }: {
    dbType: TRepoSupportedTypes;
    options: TEvaluationFields;
    boundedContextName: string;
    moduleName: string;
    concretedRepoPort: TConcretedRepoPort;
    className: string;
    connectionOptions: TEvaluationFields;
  }): RepoAdapterBuilder {
    this.repoAdapterExpression = new RepoAdapterExpressionBuilder()
      .withBoundedContextModule({ boundedContextName, moduleName })
      .withClassName(className)
      .withDBType(dbType)
      .withOptions(options)
      .withConcretedRepoPort(concretedRepoPort)
      .withConnectionOptions(connectionOptions)
      .build();
    return this;
  }

  public build(): TRepoAdapter {
    const repoAdapterDefinition: TRepoAdapter = {
      [repoAdapterKey]: {
        [identifierKey]: this.repoIdentifier,
        ...this.repoAdapterExpression,
      },
    };

    return repoAdapterDefinition;
  }
}
