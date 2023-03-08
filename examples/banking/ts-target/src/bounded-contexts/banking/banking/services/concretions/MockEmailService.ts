import { IEmailService, SendEmailRequest } from './IEmailService';

export class MockEmailService implements IEmailService {
  async send(data: SendEmailRequest): Promise<void> {
    console.log('MockEmailService sending data:', data);
  }
}
