import { Container } from '../../Container';
import { UniqueEntityID } from '../UniqueEntityID';

export const dispatchEventsCallback = async (aggregateId: UniqueEntityID) => {
  const { events } = Container.getServices();
  await events.dispatchEventsForAggregate(aggregateId);
};
