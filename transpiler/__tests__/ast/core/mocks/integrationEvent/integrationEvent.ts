import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFieldDirector.js';
import { IntegrationEventDeclarationBuilder } from '../../builders/integration-event/IntegrationEventBuilder.js';
import { IntegrationVersionMapperBuilderDirector } from '../../builders/integration-event/IntegrationVersionMapperBuilderDirector.js';
import { IntegrationVersionMapperListBuilder } from '../../builders/integration-event/IntegrationVersionMapperListBuilder.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';

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
  },
];
