/**
 * ISC License
 * Copyright (c) 2019, [Khalil Stemmler](https://khalilstemmler.com)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
import { Entity } from './Entity';
import { IDomainEvent } from './events/IDomainEvent';
import { UUIDv4 } from './UUIDv4';
// import { IIntegrationEvent } from "./events/IIntegrationEvent";
// import { IDomainIntegrationEvent } from "./events/IDomainIntegrationEvent";
import { events } from './events/Events';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];
  // private _integrationEvents: IIntegrationEvent[] = [];

  get id(): UUIDv4 {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  // get integrationEvents(): IIntegrationEvent[] {
  //   return this._integrationEvents;
  // }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    events.markAggregateForDispatch(this);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  // protected addIntegrationEvent(integrationEvent: IIntegrationEvent): void {
  //   // Add the intregration event to this aggregate's list of integration events
  //   // this.addDomainEvent(domainIntegrationEvent)
  //   const { events } = Container.getServices();
  //   this._integrationEvents.push(integrationEvent);

  //   events.markAggregateForDispatch(this);

  //   this.logIntegrationEventAdded(integrationEvent);
  // }

  // protected addDomainIntegrationEvent(event: IDomainIntegrationEvent): void {
  //   this.addDomainEvent(event.toDomain());
  //   this.addIntegrationEvent(event.toIntegration());
  // }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass?.constructor?.name,
      '==>',
      domainEventClass?.constructor?.name,
    );
  }

  // private logIntegrationEventAdded(integrationEvent: IIntegrationEvent): void {
  //   console.info(`[Integration Event Created]:`, integrationEvent);
  // }
}
