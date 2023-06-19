import { Inject } from '@nestjs/common';
import { Either, Infra, Application } from '@bitloops/bl-boilerplate-core';
import { AsyncLocalStorageService } from './async-local-storage.service';
import { MESSAGE_BUS_TOKEN } from './constants';
import { isAsyncFunction } from './utils';
import { GetTopicsParams, GetTopicsResponse } from './definitons';

/**
 * @example
 *   [bc].processId.CreateReconciliationReportCommandHandler.errors.correlationId
 *   [bc].processId.CreateReconciliationReportCommandHandler.ok.correlationId
 */
export const getSystemEventTopics = ({
  boundedContext,
  processId = 'processId',
  commandHandlerName,
  correlationId,
}: GetTopicsParams): GetTopicsResponse => {
  const errorsTopic = `${boundedContext}.${processId}.${commandHandlerName}.errors.${correlationId}`;
  const okTopic = `${boundedContext}.${processId}.${commandHandlerName}.ok.${correlationId}`;
  return {
    errorsTopic,
    okTopic,
  };
};

/**
 *  The SystemEvents decorator accesses the AsyncLocalStorageService
 *  and gets the correlationId from the store,
 *  and the command from the method arguments.
 * */
export function SystemEvents() {
  const asyncLocalStorageInjector = Inject(AsyncLocalStorageService);
  const messageBusInjector = Inject(MESSAGE_BUS_TOKEN);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    // For now we only trace async functions
    if (!isAsyncFunction(originalMethod)) {
      throw new Error('SystemEvents decorator can only be applied to async methods for now');
    }

    const asyncLocalStorageServiceKey = 'asyncLocalStorageService';
    const messageBusServiceKey = 'messageBusService';
    asyncLocalStorageInjector(target, asyncLocalStorageServiceKey);
    messageBusInjector(target, messageBusServiceKey);

    descriptor.value = async function (...args: any[]) {
      console.log(`Started executing ... [${this.constructor.name}][${propertyKey}]`);

      const asyncLocalStorage = this[
        asyncLocalStorageServiceKey as keyof PropertyDescriptor
      ] as AsyncLocalStorageService;

      const correlationId = asyncLocalStorage.getCorrelationId();
      // console.table({
      //   correlationId,
      // });
      const command: Application.Command = args[0];
      const commandHandlerName = this.constructor.name;
      let isOk: boolean | null = null;
      let error: any;
      let data: any;
      try {
        const reply = (await originalMethod.apply(this, args)) as Either<any, any>;
        if (!reply) return;

        if (reply.isOk && reply.isOk()) {
          isOk = true;
          data = reply.value;
          return reply;
        } else if (reply.isFail && reply.isFail()) {
          isOk = false;
          error = reply.value;
          return reply;
        }

        console.error('Reply is neither ok nor error:' + reply);
      } catch (err) {
        isOk = false;
        error = err;
        return err;
      } finally {
        console.log(
          `[SystemEvents]: Finished executing ... [${this.constructor.name}][${propertyKey}].`,
        );
        const messageBus = this[
          messageBusServiceKey as keyof PropertyDescriptor
        ] as Infra.MessageBus.ISystemMessageBus;
        const boundedContext = command.metadata.boundedContextId;
        const systemEvent = new Infra.MessageBus.SystemEvent(
          boundedContext,
          isOk ?? false,
          data ?? error,
        );
        const { errorsTopic, okTopic } = getSystemEventTopics({
          boundedContext,
          commandHandlerName,
          correlationId,
        });
        if (isOk) {
          await messageBus.publish(okTopic, systemEvent);
        }
        if (error) {
          await messageBus.publish(errorsTopic, systemEvent);
        }
      }
    };
  };
}
