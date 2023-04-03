import { Module, Provider } from '@nestjs/common';
import { PubSubCommandHandlers } from './application/command-handlers';
import { EventHandlers } from './application/event-handlers';
// import { QueryHandlers } from './application/query-handlers';

@Module({})
export class IamModule {
  static register(options: { inject: Provider<any>[]; imports: any[] }) {
    const InjectedProviders = options.inject || [];
    return {
      module: IamModule,
      imports: [...options.imports],
      providers: [
        ...PubSubCommandHandlers,
        ...EventHandlers,
        // ...QueryHandlers,
        ...InjectedProviders,
      ],
      exports: [
        ...PubSubCommandHandlers,
        ...EventHandlers /*...QueryHandlers*/,
      ],
    };
  }
}
