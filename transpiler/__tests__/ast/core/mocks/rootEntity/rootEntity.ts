import { DomainCreateBuilderDirector } from '../../builders/DomainCreateBuilderDirector.js';
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
import { RootEntityDeclarationBuilder } from '../../builders/rootEntity/RootEntityBuilder.js';
import { ParameterListBuilderDirector } from '../../builders/parameterListBuilderDirector.js';
import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationBuilderDirector } from '../../builders/evaluationDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';

const blFiles = {
  publicPrivateMethod:
    'transpiler/__tests__/ast/core/mocks/rootEntity/rootEntityPrivatePublicMethod.bl',
  privateOkError:
    'transpiler/__tests__/ast/core/mocks/rootEntity/rootEntityPrivateMethodOkErrorReturnType.bl',
  domainError: 'transpiler/__tests__/ast/core/mocks/rootEntity/rootEntityReturnDomainError.bl',
};
export const validRootEntityTestCases = [
  {
    description: 'Root Entity with public and private method',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(blFiles.publicPrivateMethod),
    expected: new RootEntityDeclarationBuilder()
      .withIdentifier('TodoEntity')
      .withValues(
        new EntityValuesBuilder()
          .withCreate(
            new DomainCreateBuilderDirector().buildCreateEntityWithStatements({
              entityName: 'TodoEntity',
              entityPropsName: 'TodoProps',
              entityPropsIdentifier: 'props',
              errorName: 'DomainErrors.InvalidTitleError',
              statements: [
                new ExpressionBuilderDirector().buildMemberDotMethodCallExpression(
                  ['TodoEntity', 'changeProps'],
                  new ArgumentListBuilderDirector().buildArgumentList(['props']),
                ),
                new StatementDirector().buildReturnOKStatement(
                  new ExpressionBuilderDirector().buildEvaluation(
                    new EvaluationBuilderDirector().buildEntityConstructorEvaluation('TodoEntity', {
                      expression: new ExpressionBuilderDirector().buildIdentifierExpression(
                        'props',
                      ),
                    }),
                  ),
                ),
              ],
            }),
          )
          .withPrivateMethods([
            new PrivateMethodBuilderDirector().buildStaticMethodWithInputPropsAndPrimitiveReturnType(
              {
                methodName: 'changeProps',
                returnType: 'void',
                propsType: 'TodoProps',
                statements: [
                  new ExpressionBuilderDirector().buildAssignmentExpression(
                    new ExpressionBuilderDirector().buildMemberExpression(
                      new ExpressionBuilderDirector().buildIdentifierExpression('props'),
                      'title',
                    ),
                    new ExpressionBuilderDirector().buildStringLiteralExpression('Super important'),
                  ),
                ],
              },
            ),
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
  {
    description: 'Root Entity with private method with OkErrorReturnType',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(blFiles.privateOkError),
    expected: new RootEntityDeclarationBuilder()
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
              .withParameters(new ParameterListBuilderDirector().buildParams([]))
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
    description: 'Root Entity with public method that returns domain error',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(blFiles.domainError),
    expected: new RootEntityDeclarationBuilder()
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
              .withParameters(new ParameterListBuilderDirector().buildParams([]))
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
              .withParameters(
                new ParameterListBuilderDirector().buildParams([
                  new ParameterBuilderDirector().buildPrimitiveParameter('completed', 'bool'),
                ]),
              )
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
];
