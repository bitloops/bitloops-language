import { TStructDeclaration, TVariables } from '../../../../src/types.js';
import { FieldBuilderDirector } from './fieldDirector.js';
import { StructDeclarationBuilder } from './struct.js';

export class StructBuilderDirector {
  private structDeclarationBuilder: StructDeclarationBuilder;
  constructor() {
    this.structDeclarationBuilder = new StructDeclarationBuilder();
  }

  buildStructWithRequiredFields({
    name,
    fields,
  }: {
    name: string;
    fields: TVariables;
  }): TStructDeclaration {
    const structDeclaration = this.structDeclarationBuilder
      .withIdentifier(name)
      .withVariables(fields)
      .build();

    return structDeclaration;
  }

  buildStructWithRequiredNameAndOptionalInfo({ name }: { name: string }): TStructDeclaration {
    const structDeclaration = this.structDeclarationBuilder
      .withIdentifier(name)
      .withVariables({
        fields: [
          new FieldBuilderDirector().buildPrimitiveField({
            name: 'name',
            type: 'string',
            isOptional: false,
          }),
          new FieldBuilderDirector().buildIdentifierTypeField({
            name: 'info',
            identifier: 'Info',
            isOptional: true,
          }),
        ],
      })
      .build();

    return structDeclaration;
  }
}
