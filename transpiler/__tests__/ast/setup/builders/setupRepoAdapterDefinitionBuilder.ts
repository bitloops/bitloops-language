import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  identifierKey,
  TIdentifier,
  TSetupRepoAdapterDefinition,
  TRepoAdapterExpression,
  TConcretedRepoPort,
  TRepoSupportedTypes,
  TEvaluationFields,
  setupRepoAdapterDefinitionKey,
} from '../../../../src/types.js';
import { RepoAdapterExpressionBuilder } from './repoAdapterExpressionBuilder.js';

export class SetupRepoAdapterDefinitionBuilder implements IBuilder<TSetupRepoAdapterDefinition> {
  private repoIdentifier: TIdentifier;
  private repoAdapterExpression: TRepoAdapterExpression;

  public withIdentifier(repoIdentifier: TIdentifier): SetupRepoAdapterDefinitionBuilder {
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
  }: {
    dbType: TRepoSupportedTypes;
    options: TEvaluationFields;
    boundedContextName: string;
    moduleName: string;
    concretedRepoPort: TConcretedRepoPort;
    className: string;
  }): SetupRepoAdapterDefinitionBuilder {
    this.repoAdapterExpression = new RepoAdapterExpressionBuilder()
      .withBoundedContextModule({ boundedContextName, moduleName })
      .withClassName(className)
      .withDBType(dbType)
      .withOptions(options)
      .withConcretedRepoPort(concretedRepoPort)
      .build();
    return this;
  }

  public build(): TSetupRepoAdapterDefinition {
    const repoAdapterDefinition: TSetupRepoAdapterDefinition = {
      [setupRepoAdapterDefinitionKey]: {
        [identifierKey]: this.repoIdentifier,
        ...this.repoAdapterExpression,
      },
    };

    return repoAdapterDefinition;
  }
}
