import { ChatCompletionRequestMessage, CreateCompletionRequestPrompt, OpenAIApi } from 'openai';
import { Command, ResultOrError } from './types.js';

// Define a concrete Command class for making OpenAI requests
export class OpenAICodeDavinciCommand implements Command {
  private model = 'code-davinci-002';
  public usedTokens?: number;
  private costPer1KDollars = 0.02; // This is probably correct, but needs confirmation
  constructor(
    private client: OpenAIApi,
    private params: ChatCompletionRequestMessage[],
    public fileName: string | null,
  ) {}

  get totalCost(): number {
    if (!this.usedTokens) throw new Error('Cannot calculate total cost before executing command');
    return (this.usedTokens / 1000) * this.costPer1KDollars;
  }

  async execute(): Promise<ResultOrError<string>> {
    // const i = 0;
    // if (i === 0) return (this.usedTokens = 1) && ['test', null];

    const prompt: CreateCompletionRequestPrompt = this.params.map((p) => {
      if (p.role === 'system') {
        return `The general context you need is that:
        ${p.content}`;
      }
      if (p.role === 'user') {
        return `Request: ${p.content}`;
      }
      return `Response: ${p.content}`;
    });

    try {
      const completion = await this.client.createCompletion({
        model: this.model,
        prompt,
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
      return [completion.data.choices[0].text, null];
    } catch (error: any) {
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
