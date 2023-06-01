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
import { TodoAddedPublishPubSubIntegrationDomainEventHandler } from './todo-added-publish-pub-sub-integration.domain-event-handler';
import { TodoCompletedPublishPubSubIntegrationDomainEventHandler } from './todo-completed-publish-pub-sub-integration.domain-event-handler';
import { TodoDeletedPublishPubSubIntegrationDomainEventHandler } from './todo-deleted-publish-pub-sub-integration.domain-event-handler';
import { TodoModifiedTitlePublishPubSubIntegrationDomainEventHandler } from './todo-modified-title-publish-pub-sub-integration.domain-event-handler';
import { TodoUncompletedPublishPubSubIntegrationDomainEventHandler } from './todo-uncompleted-publish-pub-sub-integration.domain-event-handler';
import { TodoAddedDomainEventToIntegrationEventHandler } from './todo-added-domain-event-to-integration-event-handler.domain-event-handler';
import { TodoCompletedDomainEventToIntegrationEventHandler } from './todo-completed-domain-event-to-integration-event-handler.domain-event-handler';
import { TodoDeletedDomainEventToIntegrationEventHandler } from './todo-deleted-domain-event-to-integration-event-handler.domain-event-handler';
import { TodoTitleModifiedDomainEventToIntegrationEventHandler } from './todo-title-modified-domain-event-to-integration-event-handler.domain-event-handler';
import { TodoUncompletedDomainEventToIntegrationEventHandler } from './todo-uncompleted-domain-event-to-integration-event-handler.domain-event-handler';
export const StreamingDomainEventHandlers = [
  TodoAddedPublishPubSubIntegrationDomainEventHandler,
  TodoCompletedPublishPubSubIntegrationDomainEventHandler,
  TodoDeletedPublishPubSubIntegrationDomainEventHandler,
  TodoModifiedTitlePublishPubSubIntegrationDomainEventHandler,
  TodoUncompletedPublishPubSubIntegrationDomainEventHandler,
  TodoAddedDomainEventToIntegrationEventHandler,
  TodoCompletedDomainEventToIntegrationEventHandler,
  TodoDeletedDomainEventToIntegrationEventHandler,
  TodoTitleModifiedDomainEventToIntegrationEventHandler,
  TodoUncompletedDomainEventToIntegrationEventHandler,
];
