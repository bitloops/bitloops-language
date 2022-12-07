import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TEntity, TEntityIdentifier, TEntityValues } from '../../../../../src/types.js';

export class EntityDeclarationBuilder implements IBuilder<TEntity> {
  private identifierName: TEntityIdentifier;
  private values: TEntityValues;

  public withIdentifier(identifierName: TEntityIdentifier): EntityDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withValues(values: TEntityValues): EntityDeclarationBuilder {
    this.values = values;
    return this;
  }

  public build(): TEntity {
    const entity = {
      Entity: {
        entityIdentifier: this.identifierName,
        entityValues: this.values,
      },
    };

    return entity;
  }
}
