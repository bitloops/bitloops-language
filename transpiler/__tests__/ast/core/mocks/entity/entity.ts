import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { DomainCreateBuilderDirector } from '../../builders/DomainCreateBuilderDirector.js';
import { EntityDeclarationBuilder } from '../../builders/entity/EntityBuilder.js';
import { EntityValuesBuilder } from '../../builders/entity/EntityValuesBuilder.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { PrivateMethodBuilderDirector } from '../../builders/methods/PrivateMethodBuilderDirector.js';
import { PublicMethodBuilderDirector } from '../../builders/methods/PublicMethodBuilderDirector.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const validEntityTestCases = [
  {
    description: 'Entity with optional field containing array type',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/entity.bl`).toString(),
    expected: new EntityDeclarationBuilder()
      .withIdentifier('TodoEntity')
      .withValues(
        new EntityValuesBuilder()
          .withCreate(
            new DomainCreateBuilderDirector().buildCreateEntityWithError({
              entityName: 'TodoEntity',
              entityPropsName: 'TodoProps',
              entityPropsIdentifier: 'props',
              errorName: 'DomainErrors.InvalidTitleError',
            }),
          )
          .withPrivateMethods([
            new PrivateMethodBuilderDirector().buildMethodWithStringParamsAndBooleanReturnType({
              methodName: 'invalidName',
              booleanValue: true,
              paramName: 'name',
            }),
          ])
          .withPublicMethods([
            new PublicMethodBuilderDirector().buildMethodWithReturnEntityEvaluation({
              methodName: 'complete',
              entityName: 'TodoEntity',
              entityFields: [
                new EvaluationFieldBuilderDirector().buildIntEvaluationField('id', 7),
                new EvaluationFieldBuilderDirector().buildStringEvaluationField(
                  'title',
                  'Super important',
                ),
              ],
            }),
          ])
          .build(),
      )
      .build(),
  },
  //   {
  //     description: 'DTO with required field containing primitive type',
  //     fileId: 'testFile.bl',
  //     inputBLString: 'DTO HelloWorldRequestDTO { string name; }',
  //     variables: [
  //       new FieldBuilderDirector().buildPrimitiveField({
  //         name: 'name',
  //         type: 'string',
  //         isOptional: false,
  //       }),
  //     ],
  //     identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  //   },
  //   {
  //     description: 'DTO with both optional and required fields',
  //     fileId: 'testFile.bl',
  //     inputBLString: 'DTO HelloWorldRequestDTO {string name; optional string phone;}',
  //     variables: [
  //       new FieldBuilderDirector().buildPrimitiveField({
  //         name: 'name',
  //         type: 'string',
  //         isOptional: false,
  //       }),
  //       new FieldBuilderDirector().buildPrimitiveField({
  //         name: 'phone',
  //         type: 'string',
  //         isOptional: true,
  //       }),
  //     ],
  //     identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  //   },
  //   {
  //     description: 'DTO with both optional fields',
  //     fileId: 'testFile.bl',
  //     inputBLString: 'DTO HelloWorldRequestDTO {optional string name; optional string phone;}',
  //     variables: [
  //       new FieldBuilderDirector().buildPrimitiveField({
  //         name: 'name',
  //         type: 'string',
  //         isOptional: true,
  //       }),
  //       new FieldBuilderDirector().buildPrimitiveField({
  //         name: 'phone',
  //         type: 'string',
  //         isOptional: true,
  //       }),
  //     ],
  //     identifier: new IdentifierBuilder().withDTOName('HelloWorldRequestDTO').build(),
  //   },
  //   {
  //     description: 'DTO with identifier field',
  //     fileId: 'testFile.bl',
  //     inputBLString: 'DTO GetByIdTodoResponseDTO {   TodoReadModel name; }',
  //     variables: [
  //       new FieldBuilderDirector().buildIdentifierTypeField({
  //         name: 'name',
  //         identifier: 'TodoReadModel',
  //         isOptional: false,
  //       }),
  //     ],
  //     identifier: new IdentifierBuilder().withDTOName('GetByIdTodoResponseDTO').build(),
  //   },
];
