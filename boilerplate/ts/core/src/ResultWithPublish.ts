import { Container } from './Container';
import { CommandMetadata } from './domain/commands/ICommand';
import { QueryMetadata } from './domain/queries/IQuery';
import { Fail, Ok, Either } from './Either';

type Metadata = CommandMetadata | QueryMetadata;

export const fail = (metadata?: Metadata) => {
  return async <A, L>(l: L): Promise<Either<A, L>> => {
    const res: Either<A, L> = new Fail(l);
    console.log('metadata1:::', metadata);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

export const ok = (metadata?: Metadata) => {
  return async <A, L>(a?: A): Promise<Either<A, L>> => {
    const res: Either<A, L> = new Ok<A, L>(a);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

const replyToResponseTopic = async <L, A>(metadata: Metadata, res: Either<L, A>) => {
  // TODO check instanceof messageBus and in case of external, change response
  console.log('replyToResponseTopic metadata:::', metadata);
  const messageBus = Container.getMessageBusFromContext(metadata.toContextId);
  if (metadata.responseTopic) await messageBus.publish(metadata.responseTopic, res);
};
