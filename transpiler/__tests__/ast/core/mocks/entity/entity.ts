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
    description: 'Entity with public and private method',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/entityPrivatePublicMethod.bl`).toString(),
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
              methodName: 'isValidName',
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
];
