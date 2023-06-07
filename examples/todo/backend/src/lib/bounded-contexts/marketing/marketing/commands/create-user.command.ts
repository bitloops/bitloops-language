import { Application } from '@bitloops/bl-boilerplate-core';
type TCreateUserCommand = {
  email: string;
  userId: string;
};
export class CreateUserCommand extends Application.Command {
  public readonly email: string;
  public readonly userId: string;
  constructor(createUserRequestDTO: TCreateUserCommand) {
    super('marketing');
    this.email = createUserRequestDTO.email;
    this.userId = createUserRequestDTO.userId;
  }
}
