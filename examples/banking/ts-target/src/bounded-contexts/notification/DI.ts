import { SendEmailCommandHandler } from './application';
import { MockEmailService } from './services/concretions';

export const sendEmailCommandHandler = new SendEmailCommandHandler(new MockEmailService());
