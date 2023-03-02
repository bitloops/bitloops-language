import { FileUtil } from '../../../../../../src/utils/file.js';
import { ConfigBusesInvocationBuilder } from '../../../builders/configBusesInvocationBuilder.js';

export const VALID_CONFIG_BUSES_INVOCATIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/configInvocation/configBuses/configBuses.bl',
    ),
    description: 'Config Buses External, InProcess, InProcess, InProcess',
    fileId: 'setup.bl',
    configInvocation: new ConfigBusesInvocationBuilder()
      .withCommandBus('External')
      .withEventBus('InProcess')
      .withIntegrationEventBus('InProcess')
      .withQueryBus('InProcess')
      .build(),
  },
];
