import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
export class MarketingNotificationDomainService {
  constructor() {}
  public async getNotificationTemplateToBeSent(): Promise<
    Either<void, Application.Repo.Errors.Unexpected>
  > {
    const sampleArray = [];
    sampleArray.forEach((element) => {
      console.log(element);
    });
    return ok();
  }
}
