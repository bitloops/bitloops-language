import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TConstDeclaration,
  TPrivateMethods,
  TPublicMethods,
  TEntityCreate,
  TEntityValues,
} from '../../../../../src/types.js';

export class EntityValuesBuilder implements IBuilder<TEntityValues> {
  private constants?: TConstDeclaration[];
  private create: TEntityCreate;
  private publicMethods?: TPublicMethods;
  private privateMethods?: TPrivateMethods;

  public withConstants(constants: TConstDeclaration[]): EntityValuesBuilder {
    this.constants = constants;
    return this;
  }

  public withCreate(create: TEntityCreate): EntityValuesBuilder {
    this.create = create;
    return this;
  }

  public withPublicMethods(publicMethods: TPublicMethods): EntityValuesBuilder {
    this.publicMethods = publicMethods;
    return this;
  }

  public withPrivateMethods(privateMethods: TPrivateMethods): EntityValuesBuilder {
    this.privateMethods = privateMethods;
    return this;
  }

  public build(): TEntityValues {
    const entityValues: TEntityValues = {
      ...this.create,
    };

    if (this.constants) entityValues.constants = this.constants;
    if (this.publicMethods) entityValues.publicMethods = this.publicMethods;
    if (this.privateMethods) entityValues.privateMethods = this.privateMethods;

    return entityValues;
  }
}
