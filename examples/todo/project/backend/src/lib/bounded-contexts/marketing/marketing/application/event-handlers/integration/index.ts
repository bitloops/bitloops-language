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
import { TodoCompletedIntegrationEventHandler } from './todo-completed.integration-event-handler';
import { UserEmailChangedIntegrationEventHandler } from './user-email-changed.integration-event-handler';
import { UserRegisteredIntegrationEventHandler } from './user-registered.integration-event-handler';
export const StreamingIntegrationEventHandlers = [
  TodoCompletedIntegrationEventHandler,
  UserEmailChangedIntegrationEventHandler,
  UserRegisteredIntegrationEventHandler,
];
