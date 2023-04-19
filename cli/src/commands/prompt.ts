import { Configuration, OpenAIApi } from 'openai';
import { copyrightSnippet } from './copyright.js';
import { ConfigUtils } from '../utils/config.js';
import inquirer, { Question } from 'inquirer';
import { promptRepoMessages as promptRepoAdapter } from '../data-sets/prompt-repo.context.js';

const questions: Question[] = [
  {
    // type: 'input',
    name: 'apiKey',
    message: '📦 What is your open-ai key?',
  },
];

const prompt = async (): Promise<void> => {
  console.log();
  console.log(copyrightSnippet);
  console.log();

  let apiKey = await ConfigUtils.readApiKey();
  if (!apiKey) {
    console.log('No API key found.');

    const answers = await inquirer.prompt(questions);
    const { apiKey: newApiKey } = answers;
    await ConfigUtils.writeApiKey(newApiKey);
    apiKey = newApiKey;
  }

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: promptRepoAdapter(),
    });
    console.log('completion usage: ', completion.data.usage);
    console.log(completion.data.choices[0].message.content);

    const finishReason = completion.data.choices[0].finish_reason;
    const usedTokens = completion.data.usage.total_tokens;
    console.log({
      finishReason,
      usedTokens,
    });
  } catch (error) {
    console.error('Error occurred: ');
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

  console.log();
};

export default prompt;
