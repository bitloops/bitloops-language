/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { Module, Provider } from '@nestjs/common';
import {
  PubSubCommandHandlers,
  StreamingCommandHandlers,
} from './application/command-handlers/index';
import { QueryHandlers } from './application/query-handlers/index';
import { StreamingDomainEventHandlers } from './application/event-handlers/domain/index';
import { StreamingIntegrationEventHandlers } from './application/event-handlers/integration/index';

@Module({})
export class TodoModule {
  static register(options: { inject: Provider<any>[]; imports: any[] }) {
    const InjectedProviders = options.inject || [];
    return {
      module: TodoModule,
      imports: [...options.imports],
      providers: [
        ...PubSubCommandHandlers,
        ...StreamingCommandHandlers,
        ...QueryHandlers,
        ...StreamingDomainEventHandlers,
        ...StreamingIntegrationEventHandlers,
        ...InjectedProviders,
      ],
      exports: [
        ...PubSubCommandHandlers,
        ...StreamingCommandHandlers,
        ...QueryHandlers,
        ...StreamingDomainEventHandlers,
        ...StreamingIntegrationEventHandlers,
      ],
    };
  }
}
