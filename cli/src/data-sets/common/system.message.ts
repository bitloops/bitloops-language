import { ChatCompletionRequestMessage } from 'openai';

export const promptContextMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content: `You generate infrastructure layer code based on the transpiled repo ports and NestJS modules. 
      You use the NestJS framework and TypeScript language. You respond with code only.`,
};
