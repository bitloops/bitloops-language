import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  identifierKey,
  TIdentifier,
  TRepoAdapterDefinition,
  TRepoAdapterExpression,
  TConcretedRepoPort,
  TRepoSupportedTypes,
  TEvaluationFields,
  repoAdapterDefinitionKey,
} from '../../../../src/types.js';
import { RepoAdapterExpressionBuilder } from './repoAdapterExpressionBuilder.js';

export class RepoAdapterDefinitionBuilder implements IBuilder<TRepoAdapterDefinition> {
  private repoIdentifier: TIdentifier;
  private repoAdapterExpression: TRepoAdapterExpression;

  public withIdentifier(repoIdentifier: TIdentifier): RepoAdapterDefinitionBuilder {
    this.repoIdentifier = repoIdentifier;
    return this;
  }

  public withExpression({
    dbType,
    options,
    boundedContextName,
    moduleName,
    concretedRepoPort,
  }: {
    dbType: TRepoSupportedTypes;
    options: TEvaluationFields;
    boundedContextName: string;
    moduleName: string;
    concretedRepoPort: TConcretedRepoPort;
  }): RepoAdapterDefinitionBuilder {
    this.repoAdapterExpression = new RepoAdapterExpressionBuilder()
      .withBoundedContextModule({ boundedContextName, moduleName })
      .withClassName(dbType)
      .withOptions(options)
      .withConcretedRepoPort(concretedRepoPort)
      .build();
    return this;
  }

  public build(): TRepoAdapterDefinition {
    const repoAdapterDefinition: TRepoAdapterDefinition = {
      [repoAdapterDefinitionKey]: {
        [identifierKey]: this.repoIdentifier,
        ...this.repoAdapterExpression,
      },
    };

    return repoAdapterDefinition;
  }
}
