import { Application } from '@bitloops/bl-boilerplate-core';
type TChangeEmailCommand = {
  email: string;
  userId: string;
};
export class ChangeEmailCommand extends Application.Command {
  public readonly email: string;
  public readonly userId: string;
  constructor(changeEmailRequestDTO: TChangeEmailCommand) {
    super('iam');
    this.email = changeEmailRequestDTO.email;
    this.userId = changeEmailRequestDTO.userId;
  }
}
