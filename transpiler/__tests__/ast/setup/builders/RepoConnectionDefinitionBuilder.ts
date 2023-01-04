import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  RepoConnectionDefinitionKey,
  RepoConnectionExpressionKey,
  TIdentifier,
  TRepoConnectionDefinition,
  TRepoConnectionOptions,
  TRepoSupportedTypes,
} from '../../../../src/types.js';

export class RepoConnectionDefinitionBuilder implements IBuilder<TRepoConnectionDefinition> {
  private identifierName: TIdentifier;
  private dbType: TRepoSupportedTypes;
  private options: TRepoConnectionOptions;

  public withIdentifier(identifierName: TIdentifier): RepoConnectionDefinitionBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withDbType(dbType: TRepoSupportedTypes): RepoConnectionDefinitionBuilder {
    this.dbType = dbType;
    return this;
  }

  public withOptions(options: TRepoConnectionOptions): RepoConnectionDefinitionBuilder {
    this.options = options;
    return this;
  }

  public build(): TRepoConnectionDefinition {
    const repoConnectionDefinition: TRepoConnectionDefinition = {
      [RepoConnectionDefinitionKey]: {
        identifier: this.identifierName,
        [RepoConnectionExpressionKey]: {
          dbType: this.dbType,
          ...this.options,
        },
      },
    };

    return repoConnectionDefinition;
  }
}
