import { Container } from './Container';
import { CommandMetadata } from './domain/commands/ICommand';
import { QueryMetadata } from './domain/queries/IQuery';
import { Fail, Ok, Either } from './Either';

type Metadata = CommandMetadata | QueryMetadata;

const fail = (metadata?: Metadata) => {
  return async <A, L>(l: L): Promise<Either<A, L>> => {
    const res: Either<A, L> = new Fail(l);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

const ok = (metadata?: Metadata) => {
  return async <A, L>(a?: A): Promise<Either<A, L>> => {
    const res: Either<A, L> = new Ok<A, L>(a);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

const replyToResponseTopic = async <L, A>(metadata: Metadata, res: Either<L, A>) => {
  const messageBus = Container.getMessageBusFromContext(metadata.toContextId);
  if (metadata.responseTopic) await messageBus.publish(metadata.responseTopic, res);
};

export function RespondWithPublish() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const metadata = args[0].metadata;
      // Call the original method with the correct context
      const result = await originalMethod.apply(this, args);
      // Wrap the result in okWithPublish or failWithPublish
      if (result.isOk()) {
        return ok(metadata)(result.value);
      } else {
        return fail(metadata)(result.value);
      }
    };
    return descriptor;
  };
}
