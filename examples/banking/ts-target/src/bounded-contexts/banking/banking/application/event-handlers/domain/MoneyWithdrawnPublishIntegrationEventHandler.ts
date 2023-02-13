import { Infra, Application, Container } from '@bitloops/bl-boilerplate-core';
import { CONTEXT_ID } from '../../../config/index.js';
import { MoneyWithdrawnIntegrationEvent } from '../../../contracts';
import { MoneyWithdrawnFromAccount } from '../../../domain/events/MoneyWithdrawnFromAccount';

export class MoneyWithdrawnPublishIntegrationEventHandler implements Application.IHandle {
  private eventBus: Infra.EventBus.IEventBus;
  constructor() {
    this.eventBus = Container.getIntegrationEventBusFromContext(CONTEXT_ID);
  }

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
