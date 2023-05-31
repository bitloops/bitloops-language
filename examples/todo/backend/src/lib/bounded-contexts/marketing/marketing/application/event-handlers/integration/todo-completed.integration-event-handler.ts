import { Application, Infra, Either, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import { StreamingCommandBusToken } from '../../../constants';
import { TodoCompletedIntegrationEvent } from '../../../../../todo/todo/contracts/integration-events/todo-completed.integration-event';
import { IncrementTodosCommand } from '../../../commands/increment-todos.command';
export class TodoCompletedIntegrationEventHandler
  implements Application.IHandleIntegrationEvent
{
  constructor(
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus
  ) {}
  get event() {
    return TodoCompletedIntegrationEvent;
  }
  get boundedContext(): string {
    return TodoCompletedIntegrationEvent.boundedContextId;
  }
  get version() {
    return 'v1';
  }
  @Traceable({
    operation: 'TodoCompletedIntegrationEventHandler',
    metrics: {
      name: 'TodoCompletedIntegrationEventHandler',
      category: 'integrationEventHandler',
    },
  })
  public async handle(
    event: TodoCompletedIntegrationEvent
  ): Promise<Either<void, never>> {
    const userId = event.userId;
    const command = new IncrementTodosCommand({ id: userId });
    await this.commandBus.publish(command);
    return ok();
  }
}
