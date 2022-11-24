import { IBuilder } from '../../../src/refactoring-arch/intermediate-ast/builders/IBuilder.js';
import {
  DTOIdentifierKey,
  DTOKey,
  fieldsKey,
  TDTO,
  TDTOIdentifier,
  TVariables,
} from '../../../src/types.js';

export class DTODeclarationBuilder implements IBuilder<TDTO> {
  private identifierName: TDTOIdentifier;
  private fields: TVariables;

  public withIdentifier(identifierName: TDTOIdentifier): DTODeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withVariables(fields: TVariables): DTODeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public build(): TDTO {
    const dto = {
      [DTOKey]: {
        [DTOIdentifierKey]: this.identifierName,
        [fieldsKey]: this.fields,
      },
    };

    return dto;
  }
}
