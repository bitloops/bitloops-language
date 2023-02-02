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
import { IDomainEvent } from './IDomainEvent';
import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityID } from '../UniqueEntityID';
import { IEventBus } from './IEventBus';

// TODO two aggregates at the same time, only one will be marked as dispatched so the other one's events will be lost
// TODO if a transaction fails the events will hang around until garbage collector clears them
export class DomainEvents {
  private markedAggregates: AggregateRoot<any>[] = [];
  private domainEventBus: IEventBus;

  constructor(domainEventBus: IEventBus) {
    this.domainEventBus = domainEventBus;
  }

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */
  public markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private async dispatchAggregateEvents(aggregate: AggregateRoot<any>): Promise<void> {
    const promises: Promise<void>[] = [];
    aggregate.domainEvents.forEach((event: IDomainEvent) => {
      promises.push(this.dispatch(event));
    });
    await Promise.all(promises);
  }

  private removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null;
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }

  public async dispatchEventsForAggregate(id: UniqueEntityID): Promise<void> {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      await this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public async register(
    callback: (event: IDomainEvent) => Promise<void>,
    eventClassName: string,
  ): Promise<void> {
    await this.domainEventBus.subscribe(eventClassName, callback);
  }

  public clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private async dispatch(event: IDomainEvent): Promise<void> {
    await this.domainEventBus.publish(event.eventTopic, event);
  }
}
