import { FileUtil } from '../../../../../src/utils/file.js';
import { ArgumentListBuilderDirector } from '../../../core/builders/argumentListBuilderDirector.js';
import { DependencyInjectionsBuilder } from '../../builders/dependencyInjectionsBuilder.js';

// DI {
//   CreateBankingCommandHandler(bankingWriteRepo, emailService);
//   GetAllBankingsQueryHandler(bankingReadRepo);
//   UpdateBankingCommandHandler();
// }

export const VALID_DEPENDENCY_INJECTIONS_INVOCATIONS = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/dependencyInjections/commandQueryHandlers.bl',
    ),
    description: 'DI of some Command and Query Handlers',
    fileId: 'setup.bl',
    expectedOutput: new DependencyInjectionsBuilder()
      .withDependencyInjection({
        type: 'CommandHandler',
        identifier: 'CreateBankingCommandHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([
          'bankingWriteRepo',
          'emailService',
        ]),
      })
      .withDependencyInjection({
        type: 'QueryHandler',
        identifier: 'GetAllBankingsQueryHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList(['bankingReadRepo']),
      })
      .withDependencyInjection({
        type: 'CommandHandler',
        identifier: 'UpdateBankingCommandHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
      })
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/dependencyInjections/multipleHandlers.bl',
    ),
    description: 'DI of some Command, Query Handlers, and Event Handlers',
    fileId: 'setup.bl',
    expectedOutput: new DependencyInjectionsBuilder()
      .withDependencyInjection({
        type: 'CommandHandler',
        identifier: 'CreateBankingCommandHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([
          'bankingWriteRepo',
          'emailService',
        ]),
      })
      .withDependencyInjection({
        type: 'QueryHandler',
        identifier: 'GetAllBankingsQueryHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList(['bankingReadRepo']),
      })
      .withDependencyInjection({
        type: 'EventHandler',
        identifier: 'UserCreatedDomainEventHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
      })
      .withDependencyInjection({
        type: 'IntegrationEventHandler',
        identifier: 'UserCreatedIntegrationEventHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
      })
      .build(),
  },
];
