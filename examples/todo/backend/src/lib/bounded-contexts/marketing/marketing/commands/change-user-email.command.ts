import { Application } from '@bitloops/bl-boilerplate-core';
type TChangeUserEmailCommand = {
  email: string;
  userId: string;
};
export class ChangeUserEmailCommand extends Application.Command {
  public readonly email: string;
  public readonly userId: string;
  constructor(changeUserEmailRequestDTO: TChangeUserEmailCommand) {
    super('marketing');
    this.email = changeUserEmailRequestDTO.email;
    this.userId = changeUserEmailRequestDTO.userId;
  }
}
