import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { DomainCreateBuilderDirector } from '../../builders/DomainCreateBuilderDirector.js';
import { EntityDeclarationBuilder } from '../../builders/entity/EntityBuilder.js';
import { EntityValuesBuilder } from '../../builders/entity/EntityValuesBuilder.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { PrivateMethodBuilderDirector } from '../../builders/methods/PrivateMethodBuilderDirector.js';
import { PublicMethodBuilderDirector } from '../../builders/methods/PublicMethodBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { IdentifierBuilder } from '../../builders/identifier.js';
import { PublicMethodBuilder } from '../../builders/methods/PublicMethodBuilder.js';
import { StatementDirector } from '../../builders/statement/statementDirector.js';
import { StatementListDirector } from '../../builders/statement/statementListDirector.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';

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
            new PublicMethodBuilderDirector().buildMethodWithReturnEntityEvaluationAsIdentifier({
              methodName: 'complete',
              entityName: 'TodoEntity',
              entityFields: [
                new EvaluationFieldBuilderDirector().buildIntEvaluationField('id', 7),
                new EvaluationFieldBuilderDirector().buildStringEvaluationField(
                  'title',
                  'Super important',
                ),
              ],
              identifierName: 'entityRes',
            }),
          ])
          .build(),
      )
      .build(),
  },
  {
    description: 'Entity with private method with OkErrorReturnType',
    fileId: 'testFile.bl',
    inputBLString: fs
      .readFileSync(`${__dirname}/entityPrivateMethodOkErrorReturnType.bl`)
      .toString(),
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
            new PrivateMethodBuilderDirector().buildMethodOkErrorReturnTypeWithNoStatements(
              'greetPrivate',
            ),
          ])
          .withPublicMethods([
            new PublicMethodBuilder()
              .withIdentifier(new IdentifierBuilder().withName('greet').build())
              .withParameters([])
              .withReturnType(
                new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOkAndNoErrors(
                  'TodoEntity',
                ),
              )
              .withStatements([
                new StatementDirector().buildConstDeclarationWithIntLiteralExpression({
                  name: 'id',
                  intLiteral: 67,
                }),
                new StatementDirector().buildReturnOKStatement(
                  new StatementDirector().buildExpressionEntityEvaluationWithFields('TodoEntity', [
                    new EvaluationFieldBuilderDirector().buildIdentifierEvaluationField('id', 'id'),
                  ]),
                ),
              ])
              .build(),
          ])
          .build(),
      )
      .build(),
  },
  {
    description: 'Entity with public method that returns domain error',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/entityReturnDomainError.bl`).toString(),
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
          .withPrivateMethods([])
          .withPublicMethods([
            new PublicMethodBuilder()
              .withIdentifier(new IdentifierBuilder().withName('greet').build())
              .withParameters([])
              .withReturnType(
                new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
                  'TodoEntity',
                  'DomainErrors.InvalidTitleError',
                ),
              )
              .withStatements(
                new StatementListDirector().buildOneReturnStatementErrorEvaluation(
                  'DomainErrors.InvalidTitleError',
                ),
              )
              .build(),
            new PublicMethodBuilder()
              .withIdentifier(new IdentifierBuilder().withName('uncomplete').build())
              .withParameters([
                new ParameterBuilderDirector().buildPrimitiveParameter('completed', 'bool'),
              ])
              .withReturnType(
                new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors(
                  'void',
                ),
              )
              .withStatements([
                new StatementDirector().buildThisMemberAssignmentExpression(
                  'completed',
                  'completed',
                ),
                new StatementDirector().buildEmptyReturnOK(),
              ])
              .build(),
          ])
          .build(),
      )
      .build(),
  },
  {
    description: 'Entity with public methods that returns error and ok accordingly',
    fileId: 'testFile.bl',
    inputBLString: fs.readFileSync(`${__dirname}/entityCheckReturnOkErrorStatement.bl`).toString(),
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
          .withPrivateMethods([])
          .withPublicMethods([
            new PublicMethodBuilder()
              .withIdentifier(new IdentifierBuilder().withName('returnError').build())
              .withParameters([])
              .withReturnType(
                new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
                  'TodoEntity',
                  'DomainErrors.InvalidTitleError',
                ),
              )
              .withStatements([
                new StatementDirector().buildConstDeclarationWithErrorEvaluation({
                  name: 'entityRes',
                  errorIdentifier: 'DomainErrors.InvalidTitleError',
                }),
                new StatementDirector().buildIfStatement({
                  condition: new ExpressionBuilderDirector().buildEqualityExpression(
                    new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
                    new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
                  ),
                  thenStatements:
                    new StatementListDirector().buildOneReturnStatementErrorEvaluation(
                      'DomainErrors.InvalidTitleError',
                    ),
                  elseStatements: [
                    new StatementDirector().buildReturnErrorStatement(
                      new ExpressionBuilderDirector().buildIdentifierExpression('entityRes'),
                    ),
                  ],
                }),
              ])
              .build(),
            new PublicMethodBuilder()
              .withIdentifier(new IdentifierBuilder().withName('returnOk').build())
              .withParameters([])
              .withReturnType(
                new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithIdentifierOk(
                  'TodoEntity',
                  'DomainErrors.InvalidTitleError',
                ),
              )
              .withStatements([
                new StatementDirector().buildConstDeclarationWithErrorEvaluation({
                  name: 'entityRes',
                  errorIdentifier: 'DomainErrors.InvalidTitleError',
                }),
                new StatementDirector().buildIfStatement({
                  condition: new ExpressionBuilderDirector().buildEqualityExpression(
                    new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
                    new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
                  ),
                  thenStatements:
                    new StatementListDirector().buildOneReturnStatementErrorEvaluation(
                      'DomainErrors.InvalidTitleError',
                    ),
                  elseStatements: [
                    new StatementDirector().buildConstDeclarationWithEntityEvaluation({
                      name: 'entityRes',
                      entityIdentifier: 'TodoEntity',
                      entityFields: [
                        new EvaluationFieldBuilderDirector().buildIntEvaluationField('id', 7),
                        new EvaluationFieldBuilderDirector().buildStringEvaluationField(
                          'title',
                          'Super important',
                        ),
                      ],
                    }),
                    new StatementDirector().buildReturnOKStatement(
                      new ExpressionBuilderDirector().buildIdentifierExpression('entityRes'),
                    ),
                  ],
                }),
              ])
              .build(),
          ])
          .build(),
      )
      .build(),
  },
];
