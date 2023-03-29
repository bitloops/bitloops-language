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
import { UniqueEntityID } from './UniqueEntityID';
// import { Container } from '../Container';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent<any>[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): IDomainEvent<any>[] {
    return this._domainEvents;
  }

  protected addDomainEventClass(domainEventClass: any): void {
    const domainEvent = new domainEventClass(this);
    this.addDomainEvent(domainEvent);
  }

  protected addDomainEvent(domainEvent: IDomainEvent<any>): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent<any>): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass?.constructor?.name,
      '==>',
      domainEventClass?.constructor?.name,
    );
  }
}
