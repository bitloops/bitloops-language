import { Infra, Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { EmailNotFoundIntegrationErrorEvent } from '@src/lib/bounded-contexts/iam/authentication/application/error-events/email-not-found.integration-event';

export class EmailNotFoundIntegrationErrorEventHandler
  implements Application.IHandleIntegrationEvent
{
  version: string;
  constructor(private integrationEventBus: Infra.EventBus.IEventBus) {}

  get event() {
    return EmailNotFoundIntegrationErrorEvent;
  }

  get boundedContext() {
    return 'IAM';
  }

  public async handle(
    event: EmailNotFoundIntegrationErrorEvent,
  ): Promise<Either<void, never>> {
    const { data } = event;
    console.log(
      'data received from EmailNotFoundIntegrationErrorEventHandler',
      data,
    );

    console.log(
      `[EmailNotFounIntegrationErrorEvent]: Successfully sent EmailNotFoundCommand`,
    );
    return ok();
  }
}
