import { FileUtil } from '../../../../../src/utils/file.js';
import { ArgumentListBuilderDirector } from '../../../core/builders/argumentListBuilderDirector.js';
import { DependencyInjectionsBuilder } from '../../builders/dependencyInjectionsBuilder.js';

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
        boundedContext: 'Banking',
        module: 'Banking',
      })
      .withDependencyInjection({
        type: 'QueryHandler',
        identifier: 'GetAllBankingsQueryHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList(['bankingReadRepo']),
        boundedContext: 'Banking',
        module: 'Banking',
      })
      .withDependencyInjection({
        type: 'CommandHandler',
        identifier: 'UpdateBankingCommandHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
        boundedContext: 'Banking',
        module: 'Banking',
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
        boundedContext: 'Banking',
        module: 'Banking',
      })
      .withDependencyInjection({
        type: 'QueryHandler',
        identifier: 'GetAllBankingsQueryHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList(['bankingReadRepo']),
        boundedContext: 'Banking',
        module: 'Banking',
      })
      .withDependencyInjection({
        type: 'EventHandler',
        identifier: 'UserCreatedDomainEventHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
        boundedContext: 'Marketing',
        module: 'Marketing',
      })
      .withDependencyInjection({
        type: 'IntegrationEventHandler',
        identifier: 'UserCreatedIntegrationEventHandler',
        argumentList: new ArgumentListBuilderDirector().buildArgumentList([]),
        boundedContext: 'Marketing',
        module: 'Marketing',
      })
      .build(),
  },
];
