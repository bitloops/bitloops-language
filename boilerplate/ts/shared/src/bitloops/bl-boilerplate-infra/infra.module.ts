import { Global, Module, Type } from '@nestjs/common';
import { AsyncLocalStorageService } from './async-local-storage.service';
import { Infra } from '@bitloops/bl-boilerplate-core';
import { MESSAGE_BUS_TOKEN } from './constants';

@Global()
@Module({})
export class InfraModule {
  static register(params: { messageBus: Type<Infra.MessageBus.ISystemMessageBus> }): {
    module: Type<InfraModule>;
    providers: any[];
    exports: any[];
  } {
    const { messageBus } = params;
    const messageBusProvider = {
      provide: MESSAGE_BUS_TOKEN,
      useClass: messageBus,
    };
    return {
      module: InfraModule,
      providers: [AsyncLocalStorageService, messageBusProvider],
      exports: [AsyncLocalStorageService, messageBusProvider],
    };
  }
}
