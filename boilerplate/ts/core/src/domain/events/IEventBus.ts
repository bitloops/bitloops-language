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
import { IEvent } from './IEvent';
import { GenericMessageHandler } from '../messages/IMessageBus';

export type EventHandler<T extends IEvent> = GenericMessageHandler<T>;

export interface IEventBus {
  subscribe<T extends IEvent>(topic: string, eventHandler: EventHandler<T>): Promise<void>;
  unsubscribe<T extends IEvent>(topic: string, eventHandler: EventHandler<T>): Promise<void>;
  publish(topic: string, message: IEvent): Promise<void>;
  publishMany(params: Array<IEvent>): Promise<void>;
}
