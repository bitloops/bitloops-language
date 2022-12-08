import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRootEntity,
  TRootEntityIdentifier,
  TEntityValues,
  RootEntityKey,
} from '../../../../../src/types.js';

export class RootEntityDeclarationBuilder implements IBuilder<TRootEntity> {
  private identifierName: TRootEntityIdentifier;
  private values: TEntityValues;

  public withIdentifier(identifierName: TRootEntityIdentifier): RootEntityDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withValues(values: TEntityValues): RootEntityDeclarationBuilder {
    this.values = values;
    return this;
  }

  public build(): TRootEntity {
    const rootEntity = {
      [RootEntityKey]: {
        entityIdentifier: this.identifierName,
        entityValues: this.values,
      },
    };

    return rootEntity;
  }
}
