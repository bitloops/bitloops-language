import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from 'openai';
import { OpenAIRequestCommand } from './commands/command.js';
import { Invoker } from './invoker.js';
import { OpenAIGPT4RequestCommand } from './commands/gpt4-command.js';
// import { OpenAICodeDavinciCommand } from './commands/code-davinci-command.js';

export class Client {
  private client: OpenAIApi;
  private invoker = new Invoker();

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.client = new OpenAIApi(configuration);
  }

  makeOpenAIRequest(
    params: ChatCompletionRequestMessage[],
    options: {
      key: string;
      isArray?: boolean;
      fileName?: string;
      metadata?: any;
    },
  ): void {
    const { key, isArray, fileName, metadata } = options;
    const command = new OpenAIRequestCommand(this.client, params, fileName ?? null, metadata);
    this.invoker.addCommand(key, command, isArray ?? false);
  }

  makeGPT4Request(
    params: ChatCompletionRequestMessage[],
    options: {
      key: string;
      isArray?: boolean;
      fileName?: string;
      metadata?: any;
    },
  ): void {
    const { key, isArray, fileName, metadata } = options;
    const command = new OpenAIGPT4RequestCommand(this.client, params, fileName ?? null, metadata);
    this.invoker.addCommand(key, command, isArray ?? false);
  }

  // makeOpenAICodeDavinciRequest(
  //   key: string,
  //   params: ChatCompletionRequestMessage[],
  //   isArray = false,
  // ): void {
  //   const command = new OpenAICodeDavinciCommand(this.client, params);
  //   this.invoker.addCommand(key, command, isArray);
  // }

  async getResponses() {
    const responses = await this.invoker.executeCommands();
    return responses;
  }

  getTotalCost(): number {
    return this.invoker.getTotalCost();
  }
}
