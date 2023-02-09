import { Infra, Application } from '@bitloops/bl-boilerplate-core';
import { MoneyWithdrawnIntegrationEvent } from '../../../contracts';
import { MoneyWithdrawnFromAccount } from '../../../domain/events/MoneyWithdrawnFromAccount';

export class MoneyWithdrawnPublishIntegrationEventHandler implements Application.IHandle {
  constructor(private eventBus: Infra.EventBus.IEventBus) {}

  public async handle(event: MoneyWithdrawnFromAccount): Promise<void> {
    const { account } = event;

    const { id: accountId, balance } = account;
    const events = MoneyWithdrawnIntegrationEvent.create({
      accountId: accountId.toString(),
      balanceAmount: balance.amount,
    });

    const eventsWithTopic = events.map((event) => {
      return { message: event, topic: event.eventTopic };
    });

    await this.eventBus.publishMany(eventsWithTopic);

    console.log(
      `[MoneyWithdrawnIntegrationEvent]: Successfully published MoneyWithdrawnIntegrationEvent`,
    );
  }
}
