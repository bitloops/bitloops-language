import { transpiler } from './index.js';

const input = `

ApplicationError UserNotFoundError(userId: string)  {
  message: 'User not found',
  errorId: 'dedb1f53-6e89-429d-bc63-8f3adfc4b407',
}

ReadModel NotificationTemplateReadModel {
  string id;
  string type;
  string template;
}

RepoPort NotificationTemplateReadRepoPort<NotificationTemplateReadModel> extends CRUDReadRepoPort {
  getByType(type: string): (OK(NotificationTemplateReadModel),Errors());
};

Struct NotificationTemplateInput {
  string emailOrigin;
  NotificationTemplateReadModel notificationTemplate;
}

DomainService MarketingNotificationDomainService (notificationTemplateRepo: NotificationTemplateReadRepoPort) {

  public getNotificationTemplateToBeSent(user: UserEntity): (OK(NotificationTemplateInput), Errors()) {
  }
}

Props UserProps {
  optional UUIDv4 id;
  string email;
  string password;
  optional string lastLogin;
}

Root Entity UserEntity {
  static create(props: UserProps): (OK(UserProps), Errors())  {
      const user = UserEntity(props);
      return user;
  }
}

DomainEvent TodoCompletionsIncrementedDomainEvent<UserEntity> {
  int32 completedTodos;
}

RepoPort UserWriteRepoPort<UserEntity> extends CRUDWriteRepoPort;

DomainEventHandler TodoCompletionsIncrementedDomainEventHandler(userRepo: UserWriteRepoPort, notificationTemplateRepo: NotificationTemplateReadRepoPort) {

  handle(event: TodoCompletionsIncrementedDomainEvent): (OK(void),Errors(ApplicationErrors.UserNotFoundError)) {
    const user = event;

    const userId = UUIDv4(user.aggregateId);
    const userFound = this.userRepo.getById(userId).ifError();

    if (NOT userFound) {
      return ApplicationErrors.UserNotFoundError(user.aggregateId);
    }

    const marketingNotificationService = MarketingNotificationDomainService.create(this.notificationTemplateRepo);

    const emailToBeSentInfo = marketingNotificationService.getNotificationTemplateToBeSent(userFound).ifError();
    
    if (NOT emailToBeSentInfo OR NOT (emailToBeSentInfo.notificationTemplate)) {
      return;
    }

    const command = SendEmailCommand.create({
      origin: emailToBeSentInfo.emailOrigin,
      destination: userFound.email.toString(),
      content: emailToBeSentInfo.notificationTemplate.template,
    });
    this.commandBus.publish(command);
  }
}
`;

const input2 = `Command AddTodoCommand {
    string title;
}`;
const result = transpiler.bitloopsCodeToIntermediateModel({
  core: [
    {
      fileContents: input,
      fileName: 'test',
      fileId: 'test',
      boundedContext: 'hello',
      module: 'world',
    },
    {
      fileContents: input2,
      fileName: 'test2',
      fileId: 'test2',
      boundedContext: 'hello',
      module: 'world',
    },
  ],
  setup: [
    {
      fileContents: 'Config.setLanguage(TypeScript-Nest);',
      fileId: 'config',
    },
  ],
});

console.log('done', result);
