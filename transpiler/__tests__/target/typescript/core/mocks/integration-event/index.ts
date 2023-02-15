import { FileUtil } from '../../../../../../src/utils/file.js';
import { IntegrationEventNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/integration-event/IntegrationEventNode.js';
import { IntegrationEventNodeBuilderDirector } from '../../builders/integrationEventNodeBuilderDirector.js';
import { IntegrationVersionMapperNodeBuilderDirector } from '../../builders/integrationVersionMapperNodeBuilderDirector.js';
import { EvaluationFieldBuilderDirector } from '../../builders/evaluationFIeld.js';

type TestCase = {
  description: string;
  integrationEvent: IntegrationEventNode;
  output: string;
};

export const contextInfo = {
  boundedContextName: 'Banking',
  moduleName: 'Banking',
};

export const VALID_INTEGRATION_EVENT_TEST_CASES: TestCase[] = [
  {
    description: 'an integration event with one version mapper',
    integrationEvent:
      new IntegrationEventNodeBuilderDirector().buildIntegrationEventWithOneVersionMapper({
        integrationEventIdentifier: 'MoneyDepositedIntegrationEvent',
        parameterName: 'event',
        parameterType: 'MoneyDepositedToAccountDomainEvent',
        versionMapper:
          new IntegrationVersionMapperNodeBuilderDirector().buildWithReturnStructEvaluationStatement(
            {
              versionName: 'v1',
              schemaType: 'IntegrationSchemaV1',
              constIdentifier: 'moneyDeposited',
              evaluationFieldNodes: [
                new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
                  'accountId',
                  'testAccount',
                ),
                new EvaluationFieldBuilderDirector().buildStringLiteralEvaluationField(
                  'amount',
                  'testAmount',
                ),
              ],
            },
          ),
      }),
    output: FileUtil.readFileString(
      'transpiler/__tests__/target/typescript/core/mocks/integration-event/moneyDepositedIntegrationEvent.mock.ts',
    ),
  },
];
