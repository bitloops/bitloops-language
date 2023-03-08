import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TConstDeclaration,
  TPrivateMethods,
  TValueObject,
  TValueObjectCreate,
  TValueObjectIdentifier,
} from '../../../../../src/types.js';

export class ValueObjectDeclarationBuilder implements IBuilder<TValueObject> {
  private identifierName: TValueObjectIdentifier;
  private constants?: TConstDeclaration[];
  private create: TValueObjectCreate;
  private privateMethods?: TPrivateMethods;

  public withIdentifier(identifierName: TValueObjectIdentifier): ValueObjectDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withConstants(constants: TConstDeclaration[]): ValueObjectDeclarationBuilder {
    this.constants = constants;
    return this;
  }

  public withCreate(create: TValueObjectCreate): ValueObjectDeclarationBuilder {
    this.create = create;
    return this;
  }

  public withPrivateMethods(privateMethods: TPrivateMethods): ValueObjectDeclarationBuilder {
    this.privateMethods = privateMethods;
    return this;
  }

  public build(): TValueObject {
    const valueObject: TValueObject = {
      ValueObject: {
        valueObjectIdentifier: this.identifierName,
        ...this.create,
      },
    };
    if (this.constants) valueObject.ValueObject.constants = this.constants;
    if (this.privateMethods) valueObject.ValueObject.privateMethods = this.privateMethods;

    return valueObject;
  }
}
