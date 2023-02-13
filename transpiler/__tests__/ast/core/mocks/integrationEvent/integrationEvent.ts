import { FileUtil } from '../../../../../src/utils/file.js';
import { IntegrationEventDeclarationBuilder } from '../../builders/integration-event/IntegrationEventBuilder.js';
import { ParameterBuilderDirector } from '../../builders/ParameterBuilderDirector.js';

export const validIntegrationEventTestCases = [
  {
    description: 'Integration Event with one version mapper',
    fileId: 'testFile.bl',
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/core/mocks/integrationEvent/integrationEvent.bl',
    ),
    expected: new IntegrationEventDeclarationBuilder()
      .withIdentifier('MoneyDepositedIntegrationEvent')
      .withInput(
        new ParameterBuilderDirector().buildIdentifierParameter(
          'input',
          'MoneyDepositedToAccountDomainEvent',
        ),
      )
      .withVersionMappers({ integrationVersionMappers: [] })
      .build(),
  },
];
