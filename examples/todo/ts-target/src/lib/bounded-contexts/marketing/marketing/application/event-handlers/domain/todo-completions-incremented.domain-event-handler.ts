import {
  Application,
  Infra,
  Either,
  Domain,
  fail,
  ok,
} from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { Inject } from '@nestjs/common';
import {
  NotificationTemplateReadRepoPortToken,
  UserWriteRepoPortToken,
  StreamingCommandBusToken,
  StreamingIntegrationEventBusToken,
  PubSubIntegrationEventBusToken,
} from '../../../constants';
import { UserWriteRepoPort } from '../../../ports/user-write.repo-port';
import { NotificationTemplateReadRepoPort } from '../../../ports/notification-template-read.repo-port';
import { TodoCompletionsIncrementedDomainEvent } from '../../../domain/events/todo-completions-incremented.domain-event';
import { ApplicationErrors } from '../../errors/index';
import { MarketingNotificationDomainService } from '../../../domain/services/marketing-notification.domain-service';
import { SendEmailCommand } from '../../../commands/send-email.command';
export class TodoCompletionsIncrementedDomainEventHandler
  implements Application.IHandleDomainEvent
{
  constructor(
    @Inject(UserWriteRepoPortToken)
    private readonly userRepo: UserWriteRepoPort,
    @Inject(NotificationTemplateReadRepoPortToken)
    private readonly notificationTemplateRepo: NotificationTemplateReadRepoPort,
    @Inject(StreamingCommandBusToken)
    private readonly commandBus: Infra.CommandBus.IStreamCommandBus,
    @Inject(StreamingIntegrationEventBusToken)
    private readonly integrationEventBus: Infra.EventBus.IEventBus,
    @Inject(PubSubIntegrationEventBusToken)
    private readonly pubSubIntegrationEventBus: Infra.EventBus.IEventBus
  ) {}
  get event() {
    return TodoCompletionsIncrementedDomainEvent;
  }
  get boundedContext(): string {
    return 'marketing';
  }
  @Traceable({
    operation: 'TodoCompletionsIncrementedDomainEventHandler',
    metrics: {
      name: 'TodoCompletionsIncrementedDomainEventHandler',
      category: 'domainEventHandler',
    },
  })
  public async handle(
    event: TodoCompletionsIncrementedDomainEvent
  ): Promise<Either<void, ApplicationErrors.UserNotFoundError>> {
    const user = event;
    const userId = new Domain.UUIDv4(user.aggregateId);
    const userFound = await this.userRepo.getById(userId);
    if (userFound.isFail()) {
      return fail(userFound.value);
    }
    if (!userFound.value) {
      return fail(new ApplicationErrors.UserNotFoundError(user.aggregateId));
    }
    const marketingNotificationService = new MarketingNotificationDomainService(
      this.notificationTemplateRepo
    );
    const emailToBeSentInfo =
      await marketingNotificationService.getNotificationTemplateToBeSent(
        userFound.value
      );
    if (emailToBeSentInfo.isFail()) {
      return fail(emailToBeSentInfo.value);
    }
    if (
      !emailToBeSentInfo.value ||
      !emailToBeSentInfo.value.notificationTemplate
    ) {
      return ok();
    }
    const command = new SendEmailCommand({
      origin: emailToBeSentInfo.value.emailOrigin,
      destination: userFound.value.email.toString(),
      content: emailToBeSentInfo.value.notificationTemplate.template,
    });
    await this.commandBus.publish(command);
    return ok();
  }
}
