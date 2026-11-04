import { Message } from '../domain/messages/IMessage.js';
import { UUIDv4 } from '../domain/UUIDv4.js';
import { Either } from '../Either';
import { asyncLocalStorage } from '../helpers/asyncLocalStorage.js';
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

const CONTEXT = 'context';
export abstract class OrchestratorHandler<IRequest, IOkResponse> {
  abstract get triggerMessage(): any;
  abstract get boundedContext(): string; // TODO check if we can add many
  abstract get domainEvents(): any[];
  abstract get systemEventNames(): string[];
  abstract get integrationEvents(): any[];
  abstract listen(message: Message): Promise<Either<IOkResponse, ICoreError>>;

  get orchestratorNameId(): string {
    return this.constructor.name;
  }

  protected isTriggerMessage(message: Message): boolean {
    return message.metadata.name === this.triggerMessage.name;
  }

  async trigger(message: Message): Promise<void> {
    const orchestratorName = this.constructor.name;
    const orchestratorInstanceId = new UUIDv4().toString() + '-' + orchestratorName;
    const store = asyncLocalStorage.getStore();
    if (!store) {
      throw new Error('No store found, did you forget to attach correlation middleware?');
    }
    const ctx = store.get(CONTEXT);
    const alreadyCreatedOrchestratorInstanceIds = ctx.orchestratorInstanceIds
      ? JSON.parse(ctx.orchestratorInstanceIds)
      : {};
    const ctxWithOrchestratorInstanceId = {
      ...ctx,
      orchestratorInstanceIds: JSON.stringify({
        ...alreadyCreatedOrchestratorInstanceIds,
        [orchestratorName]: orchestratorInstanceId,
      }),
    };
    store.set(CONTEXT, ctxWithOrchestratorInstanceId);
    if (!message.metadata.context.orchestratorInstanceIds) {
      message.metadata.context.orchestratorInstanceIds = JSON.stringify({});
    }
    const orchestratorInstanceIds = JSON.parse(message.metadata.context.orchestratorInstanceIds);
    orchestratorInstanceIds[orchestratorName] = orchestratorInstanceId;
    message.metadata.context.orchestratorInstanceIds = JSON.stringify(orchestratorInstanceIds);
  }

  public getOrchestratorNameId() {
    return {
      orchestratorNameId: this.orchestratorNameId,
    };
  }

  public isGeneratedByOrchestrator(message: Message): boolean {
    const orchestratorInstanceIdStr = message.metadata.context.orchestratorInstanceIds;
    if (!orchestratorInstanceIdStr) {
      return true;
    }
    const orchestratorInstanceIds = JSON.parse(orchestratorInstanceIdStr);
    return orchestratorInstanceIds?.[this.constructor.name] !== undefined;
  }
}
