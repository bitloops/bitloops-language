import { Message } from '../domain/messages/IMessage.js';
import { UUIDv4 } from '../domain/UUIDv4.js';
import { Either } from '../Either';
import { ICoreError } from '../ICoreError';

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
export interface UseCase<IRequest, IResponse> {
  get command(): any;
  get boundedContext(): string;
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}

export interface CommandHandler<IRequest, IOkResponse> {
  get command(): any;
  get boundedContext(): string;
  execute(request?: IRequest): Promise<Either<IOkResponse, ICoreError>>;
}

export interface QueryHandler<IRequest, IOkResponse> {
  get query(): any;
  get boundedContext(): string;
  execute(request?: IRequest): Promise<Either<IOkResponse, ICoreError>>;
}

export abstract class OrchestratorHandler<IRequest, IOkResponse> {
  abstract get triggerMessage(): any;
  abstract get boundedContext(): string; // TODO check if we can add many
  abstract get domainEvents(): any[];
  abstract get systemEventNames(): string[];
  abstract listen(message: Message): Promise<Either<IOkResponse, ICoreError>>;

  get orchestratorNameId(): string {
    return this.constructor.name;
  }

  protected isTriggerMessage(message: Message): boolean {
    return message.metadata.name === this.triggerMessage.name;
  }

  async trigger(message: Message): Promise<void> {
    const orchestratorInstanceId = new UUIDv4().toString();
    message.metadata.orchestratorInstanceId = orchestratorInstanceId;
  }

  getOrchestratorStateKey(message: Message) {
    const orchestratorInstanceId = (message as any).metadata.orchestratorInstanceId;
    return `${this.orchestratorNameId}:${orchestratorInstanceId}`;
  }
}
