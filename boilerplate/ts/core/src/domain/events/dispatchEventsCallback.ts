import { Container } from '../../Container';
import { CommandMetadata } from '../commands/ICommand';
import { UniqueEntityID } from '../UniqueEntityID';

export const dispatchEventsCallback = async (
  aggregateId: UniqueEntityID,
  metadata?: CommandMetadata,
) => {
  const { events } = Container.getServices();
  await events.dispatchEventsForAggregate(aggregateId, metadata);
};
