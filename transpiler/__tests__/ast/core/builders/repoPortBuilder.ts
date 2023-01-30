import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  methodDefinitionListKey,
  repoPortIdentifierKey,
  repoPortKey,
  TDefinitionMethods,
  TExtendsRepoPorts,
  TReadModelIdentifier,
  TRepoPort,
} from '../../../../src/types.js';

export class RepoPortBuilder implements IBuilder<TRepoPort> {
  private identifierName: TReadModelIdentifier;
  private entityIdentifier: string;
  private readModelIdentifier: string;
  private extendsRepoPorts: TExtendsRepoPorts;
  private definitionMethods: TDefinitionMethods;

  public withIdentifier(identifierName: TReadModelIdentifier): RepoPortBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withAggregateRootName(entityIdentifier: string): RepoPortBuilder {
    this.entityIdentifier = entityIdentifier;
    return this;
  }

  public withReadModelName(readModelIdentifier: string): RepoPortBuilder {
    this.readModelIdentifier = readModelIdentifier;
    return this;
  }

  public withExtendedRepoPorts(extendsRepoPorts: TExtendsRepoPorts): RepoPortBuilder {
    this.extendsRepoPorts = extendsRepoPorts;
    return this;
  }

  public withDefinitionMethods(definitionMethods: TDefinitionMethods): RepoPortBuilder {
    this.definitionMethods = definitionMethods;
    return this;
  }

  public build(): TRepoPort {
    if (this.entityIdentifier) {
      const res: TRepoPort = {
        [repoPortKey]: {
          [repoPortIdentifierKey]: this.identifierName,
          extendsRepoPorts: this.extendsRepoPorts,
          entityIdentifier: this.entityIdentifier,
        },
      };
      if (this.definitionMethods && this.definitionMethods[methodDefinitionListKey].length > 0) {
        res[repoPortKey].methodDefinitionList = this.definitionMethods[methodDefinitionListKey];
      }
      return res;
    } else {
      const res: TRepoPort = {
        [repoPortKey]: {
          [repoPortIdentifierKey]: this.identifierName,
          extendsRepoPorts: this.extendsRepoPorts,
          readModelIdentifier: this.readModelIdentifier,
        },
      };
      if (this.definitionMethods && this.definitionMethods[methodDefinitionListKey].length > 0) {
        res[repoPortKey].methodDefinitionList = this.definitionMethods[methodDefinitionListKey];
      }
      return res;
    }
  }
}
