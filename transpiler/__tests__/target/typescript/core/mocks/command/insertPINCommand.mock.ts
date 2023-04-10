import { Application, Domain, asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
type TInsertPINCommand = {
  email: string;
  pin: string;
};
export class InsertPINCommand extends Application.Command {
  public readonly email: string;
  public readonly pin: string;
  public readonly metadata: Application.TCommandMetadata = {
    boundedContextId: 'banking',
    createdTimestamp: Date.now(),
    messageId: new Domain.UUIDv4().toString(),
    correlationId: asyncLocalStorage.getStore()?.get('correlationId'),
    context: asyncLocalStorage.getStore()?.get('context'),
  };
  constructor(insertPINRequestDTO: TInsertPINCommand) {
    super();
    this.email = insertPINRequestDTO.email;
    this.pin = insertPINRequestDTO.pin;
  }
}
