import { FileUtil } from '../../../../../src/utils/file.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';
import { DomainEventHandlerBuilder } from '../../builders/domainEventHandler/DomainEventHandlerBuilder.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { IntegrationEventDeclarationBuilder } from '../../builders/integration-event/IntegrationEventBuilder.js';
import { IntegrationVersionMapperBuilderDirector } from '../../builders/integration-event/IntegrationVersionMapperBuilderDirector.js';
import { IntegrationVersionMapperListBuilder } from '../../builders/integration-event/IntegrationVersionMapperListBuilder.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';
import { ReturnOkErrorTypeBuilderDirector } from '../../builders/returnOkErrorTypeBuilderDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/variableDeclarationDirector.js';

export const validIntegrationEventTestCases = [
  {
    description: 'Integration Event with one version mapper',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/integrationEvent/integrationEventOneVersionMapper.bl',
    ),
    expected: new IntegrationEventDeclarationBuilder()
      .withIdentifier('MoneyDepositedIntegrationEvent')
      .withInput(
        new ParameterBuilderDirector().buildIdentifierParameter(
          'event',
          'MoneyDepositedToAccountDomainEvent',
        ),
      )
      .withVersionMappers(
        new IntegrationVersionMapperListBuilder()
          .withVersionMappers([
            new IntegrationVersionMapperBuilderDirector().buildWithReturnStructEvaluationStatement({
              versionName: 'v1',
              schemaType: 'MoneyDepositedIntegrationSchemaV1',
              constDeclarationName: 'moneyDeposited',
              structEvaluationFields: [
                new EvaluationFieldBuilderDirector().buildMemberDotExpressionEvaluationField({
                  identifierName: 'accountId',
                  leftIdentifierValueName: 'event',
                  rightIdentifierValueName: 'accountId',
                }),
                new EvaluationFieldBuilderDirector().buildMemberDotExpressionEvaluationField({
                  identifierName: 'amount',
                  leftIdentifierValueName: 'event',
                  rightIdentifierValueName: 'balanceAmount',
                }),
              ],
            }),
          ])
          .build(),
      )
      .build(),
    expectedDomainEventHandler: new DomainEventHandlerBuilder()
      .withIdentifier('MoneyDepositedToAccountDomainEventToIntegrationEventHandler')
      .withHandleMethod({
        statements: [
          new ConstDeclarationBuilderDirector().buildConstDeclarationIntegrationEvaluation({
            name: 'events',
            integrationEventIdentifier: 'MoneyDepositedIntegrationEvent',
            integrationEventInput: 'event',
          }),
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(
              'integrationEventBus',
              'publishMany',
            ),
            new ArgumentListBuilderDirector().buildArgumentList(['events']),
          ),
        ],
        parameter: {
          parameter: {
            value: 'event',
            type: {
              bitloopsIdentifierType: 'MoneyDepositedToAccountDomainEvent',
            },
          },
        },
        returnType:
          new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors(
            'void',
          ),
      })
      .withIntegrationEventBusDependency()
      .build(),
  },
  {
    description: 'Integration Event with two version mappers',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/integrationEvent/integrationEventTwoVersionMappers.bl',
    ),
    expected: new IntegrationEventDeclarationBuilder()
      .withIdentifier('MoneyDepositedIntegrationEvent')
      .withInput(
        new ParameterBuilderDirector().buildIdentifierParameter(
          'event',
          'MoneyDepositedToAccountDomainEvent',
        ),
      )
      .withVersionMappers(
        new IntegrationVersionMapperListBuilder()
          .withVersionMappers([
            new IntegrationVersionMapperBuilderDirector().buildWithReturnStructEvaluationStatement({
              versionName: 'v1',
              schemaType: 'MoneyDepositedIntegrationSchemaV1',
              constDeclarationName: 'moneyDeposited',
              structEvaluationFields: [
                new EvaluationFieldBuilderDirector().buildMemberDotExpressionEvaluationField({
                  identifierName: 'accountId',
                  leftIdentifierValueName: 'event',
                  rightIdentifierValueName: 'accountId',
                }),
                new EvaluationFieldBuilderDirector().buildMemberDotExpressionEvaluationField({
                  identifierName: 'amount',
                  leftIdentifierValueName: 'event',
                  rightIdentifierValueName: 'balanceAmount',
                }),
              ],
            }),
            new IntegrationVersionMapperBuilderDirector().buildWithReturnStructEvaluationStatement({
              versionName: 'v2.0.1',
              schemaType: 'MoneyDepositedIntegrationSchemaV2',
              constDeclarationName: 'moneyDeposited',
              structEvaluationFields: [
                new EvaluationFieldBuilderDirector().buildMemberDotExpressionEvaluationField({
                  identifierName: 'accountId',
                  leftIdentifierValueName: 'event',
                  rightIdentifierValueName: 'accountId',
                }),
                new EvaluationFieldBuilderDirector().buildIntEvaluationField('amount', 20),
              ],
            }),
          ])
          .build(),
      )
      .build(),
    expectedDomainEventHandler: new DomainEventHandlerBuilder()
      .withIdentifier('MoneyDepositedToAccountDomainEventToIntegrationEventHandler')
      .withHandleMethod({
        statements: [
          new ConstDeclarationBuilderDirector().buildConstDeclarationIntegrationEvaluation({
            name: 'events',
            integrationEventIdentifier: 'MoneyDepositedIntegrationEvent',
            integrationEventInput: 'event',
          }),
          new ExpressionBuilderDirector().buildMethodCallExpression(
            new ExpressionBuilderDirector().buildThisMemberExpressionOutOfVariables(
              'integrationEventBus',
              'publishMany',
            ),
            new ArgumentListBuilderDirector().buildArgumentList(['events']),
          ),
        ],
        parameter: {
          parameter: {
            value: 'event',
            type: {
              bitloopsIdentifierType: 'MoneyDepositedToAccountDomainEvent',
            },
          },
        },
        returnType:
          new ReturnOkErrorTypeBuilderDirector().buildReturnOkErrorWithPrimitiveOkAndNoErrors(
            'void',
          ),
      })
      .withIntegrationEventBusDependency()
      .build(),
  },
];
