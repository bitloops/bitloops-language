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
import { IDomainEvent } from '../../domain/events/IDomainEvent';
import { EventHandler, IEventBus } from '../../domain/events/IEventBus';

abstract class EventBusDecorator implements IEventBus {
  protected decoratedEventBus: IEventBus;
  constructor(decoratedEventBus: IEventBus) {
    this.decoratedEventBus = decoratedEventBus;
  }

  public subscribe(topic: string, eventHandler: EventHandler): Promise<void> {
    return this.decoratedEventBus.subscribe(topic, eventHandler);
  }

  public publish(topic: string, message: IDomainEvent): Promise<void> {
    return this.decoratedEventBus.publish(topic, message);
  }

  public unsubscribe(topic: string, eventHandler: EventHandler): Promise<void> {
    return this.decoratedEventBus.unsubscribe(topic, eventHandler);
  }
}

export class ExternalEventBusDecorator extends EventBusDecorator {
  constructor(decoratedEventBus: IEventBus, private externalEventBus: IEventBus) {
    super(decoratedEventBus);
  }

  public async publish(topic: string, message: IDomainEvent): Promise<void> {
    await Promise.all([
      this.decoratedEventBus.publish(topic, message),
      this.externalEventBus.publish(topic, message),
    ]);
  }
}
