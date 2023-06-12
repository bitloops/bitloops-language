import { Application } from '@bitloops/bl-boilerplate-core';
type TSendEmailCommand = {
  destination: string;
  origin: string;
  content: string;
};
export class SendEmailCommand extends Application.Command {
  public readonly destination: string;
  public readonly origin: string;
  public readonly content: string;
  constructor(sendEmailRequestDTO: TSendEmailCommand) {
    super('marketing');
    this.destination = sendEmailRequestDTO.destination;
    this.origin = sendEmailRequestDTO.origin;
    this.content = sendEmailRequestDTO.content;
  }
}
