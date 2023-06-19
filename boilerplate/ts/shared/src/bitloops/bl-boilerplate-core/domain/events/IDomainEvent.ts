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
import { Message } from '../messages/IMessage.js';
import { IEvent, TEventMetadata } from './IEvent';

export interface IDomainEvent<T> extends IEvent<T> {
  aggregateId: any;
}

export type TDomainEventProps<T> = T & { aggregateId: string };

export abstract class DomainEvent<T> extends Message implements IDomainEvent<T> {
  [x: string]: any;
  public aggregateId: any;
  declare metadata: TEventMetadata;
  constructor(boundedContextId: string, payload: T, metadata?: Partial<TEventMetadata>) {
    super(metadata);
    this.metadata.boundedContextId = boundedContextId;
    Object.assign(this, payload);
  }
}
