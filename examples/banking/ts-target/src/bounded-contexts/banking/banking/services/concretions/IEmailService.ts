export type SendEmailRequest = {
  origin: string;
  destination: string;
  content: string;
};

export interface IEmailService {
  send(data: SendEmailRequest): Promise<void>;
}
