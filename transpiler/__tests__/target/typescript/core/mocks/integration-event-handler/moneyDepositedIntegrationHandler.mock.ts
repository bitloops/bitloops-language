import { Application, Infra } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { MoneyDepositedIntegrationEvent } from '../../../../../banking/banking/contracts/integration-events/MoneyDepositedIntegrationEvent';
export class MoneyDepositedIntegrationHandler implements Application.IHandle {
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.ICommandBus,
  ) {}
  get event() {
    return MoneyDepositedIntegrationEvent;
  }
  get boundedContext(): string {
    return MoneyDepositedIntegrationEvent.boundedContext;
  }
  @Traceable({
    operation: 'MoneyDepositedIntegrationHandler',
    metrics: {
      name: 'MoneyDepositedIntegrationHandler',
      category: 'integrationEventHandler',
    },
  })
  public async handle(event: MoneyDepositedIntegrationEvent): Promise<void> {
    const email = 'example@email.com';
    await this.commandBus.send(email);
  }
}
