import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import { MoneyDepositedIntegrationEvent } from '../../../contracts';
import { MoneyDepositedToAccount } from '../../../domain/events/MoneyDepositedToAccount';

export class MoneyDepositedPublishIntegrationEventHandler implements Application.IHandle {
  constructor(private eventBus: Infra.EventBus.IEventBus) {}

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
