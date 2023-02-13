import { Infra, Application, Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../../../config/index.js';
import { MoneyDepositedIntegrationEvent } from '../../../contracts';
import { MoneyDepositedToAccount } from '../../../domain/events/MoneyDepositedToAccount';

export class MoneyDepositedPublishIntegrationEventHandler implements Application.IHandle {
  private eventBus: Infra.EventBus.IEventBus;
  constructor() {
    this.eventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  }

  public async handle(event: MoneyDepositedToAccount): Promise<void> {
    const { account } = event;

    const { id: accountId, balance } = account;
    const events = MoneyDepositedIntegrationEvent.create({
      accountId: accountId.toString(),
      balanceAmount: balance.amount,
    });

    const eventsWithTopic = events.map((event) => {
      return { message: event, topic: event.eventTopic };
    });

    await this.eventBus.publishMany(eventsWithTopic);

    console.log(
      `[AfterTodoCreatedDomainEvent]: Successfully published MoneyDepositedIntegrationEvent`,
    );
  }
}
