import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
export class MarketingNotificationDomainService {
  constructor() {}
  public async getNotificationTemplateToBeSent(): Promise<
    Either<void, Application.Repo.Errors.Unexpected>
  > {
    const sampleArray = [1, 2, 3, 4, 5];
    const newArray = sampleArray.map((element) => {
      return element * 2;
    });
    return ok();
  }
}
