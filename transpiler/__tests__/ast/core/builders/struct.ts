import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TVariables,
  TStructIdentifier,
  StructKey,
  TStructDeclaration,
  structIdentifierKey,
} from '../../../../src/types.js';

export class StructDeclarationBuilder implements IBuilder<TStructDeclaration> {
  private identifierName: TStructIdentifier;
  private fields: TVariables;

  public withIdentifier(identifierName: TStructIdentifier): StructDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): StructDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public build(): TStructDeclaration {
    const struct: TStructDeclaration = {
      [StructKey]: {
        [structIdentifierKey]: this.identifierName,
        ...this.fields,
      },
    };

    return struct;
  }
}
