import { Application } from '@bitloops/bl-boilerplate-core';
type TInsertPINCommand = {
  email: string;
  pin: string;
};
export class InsertPINCommand extends Application.Command {
  public readonly email: string;
  public readonly pin: string;
  public static readonly commandName = 'banking.banking.COMMAND.INSERT_PIN';
  constructor(insertPINRequestDTO: TInsertPINCommand) {
    super(InsertPINCommand.commandName, 'banking');
    this.email = insertPINRequestDTO.email;
    this.pin = insertPINRequestDTO.pin;
  }
  static getCommandTopic(): string {
    return super.getCommandTopic(InsertPINCommand.commandName, 'banking');
  }
}
