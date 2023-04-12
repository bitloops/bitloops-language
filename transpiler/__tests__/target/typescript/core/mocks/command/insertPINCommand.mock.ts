import { Application } from '@bitloops/bl-boilerplate-core';
type TInsertPINCommand = {
  email: string;
  pin: string;
};
export class InsertPINCommand extends Application.Command {
  public readonly email: string;
  public readonly pin: string;
  constructor(insertPINRequestDTO: TInsertPINCommand) {
    super('banking');
    this.email = insertPINRequestDTO.email;
    this.pin = insertPINRequestDTO.pin;
  }
}
