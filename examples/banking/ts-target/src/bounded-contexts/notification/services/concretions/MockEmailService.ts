import { IEmailService, SendEmailRequest } from './IEmailService';

export class MockEmailService implements IEmailService {
  send(data: SendEmailRequest): void {
    console.log('MockEmailService sending data:', data);
  }
}
