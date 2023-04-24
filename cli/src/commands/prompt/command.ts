import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

// Define the Command interface
export interface Command {
  execute(): Promise<ResultOrError<string>>;
  usedTokens?: number;
  totalCost: number;
}

type ResultOrError<Result> = [Result, null] | [null, Error];

// Define a concrete Command class for making OpenAI requests
export class OpenAIRequestCommand implements Command {
  private model = 'gpt-3.5-turbo';
  public usedTokens?: number;
  private costPer1KDollars = 0.002;
  constructor(private client: OpenAIApi, private params: ChatCompletionRequestMessage[]) {}

  get totalCost(): number {
    if (!this.usedTokens) throw new Error('Cannot calculate total cost before executing command');
    return (this.usedTokens / 1000) * this.costPer1KDollars;
  }

  async execute(): Promise<ResultOrError<string>> {
    // const i = 0;
    // if (i === 0) return (this.usedTokens = 1) && ['test', null];

    try {
      const completion = await this.client.createChatCompletion({
        model: this.model,
        messages: this.params,
      });
      console.log('completion usage: ', completion.data.usage);
      // console.log(completion.data.choices[0].message.content);

      const finishReason = completion.data.choices[0].finish_reason;
      const usedTokens = completion.data.usage.total_tokens;
      console.log({
        finishReason,
        usedTokens,
      });
      this.usedTokens = usedTokens;
      return [completion.data.choices[0].message.content, null];
    } catch (error) {
      console.error('Error occurred: ');
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return [null, error];
    }
  }
}
