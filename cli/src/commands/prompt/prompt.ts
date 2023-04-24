import fs from 'fs';
import { copyrightSnippet } from '../copyright.js';
import { ConfigUtils } from '../../utils/config.js';
import inquirer, { Question } from 'inquirer';
import { inquirerFuzzy as inquirerPath } from '../../utils/inquirer.js';
import { promptRepoMessages as promptRepoAdapter } from './data-sets/prompt-repo.context.js';
import { Client } from './client.js';
import { GENERATED_INFRA_KEYS } from './invoker.js';
import { promptApiGrpcController } from './data-sets/api/prompt-grpc-controller.context.js';
import { promptModuleMessages } from './data-sets/prompt-module.context.js';
import { promptServiceMessages } from './data-sets/prompt-service.context.js';
/**
 * TODO add a json or yaml config file, where the user can set settings for preferred repo adapters
 * for each port(file-name as a key), and e.g. MongoDB as value
 * Also which command/query handlers he wishes to expose through the API
 */

interface ICollection {
  targetDirPath: string;
}
const questions: Question[] = [
  {
    // type: 'input',
    name: 'apiKey',
    message: '📦 What is your open-ai key?',
  },
  {
    name: 'targetDirPath',
    message: '🎯 Where would you like your generated files to be exported?',
    default: './output',
  },
];

const prompt = async (source: ICollection): Promise<void> => {
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
  const targetDirPath = await inquirerPath(questions[1], source);
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }

  // Example usage
  const client = new Client(apiKey);

  client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API, promptApiGrpcController());
  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.MODULE_DEFINITION('todo', 'todo'),
    promptModuleMessages(),
  );
  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.REPOSITORIES('todo', 'todo'),
    promptRepoAdapter(),
    true,
  );
  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.SERVICES('todo', 'todo'),
    promptServiceMessages(),
    true,
  );

  const responses = await client.getResponses();
  console.log(responses);
  // console.log(JSON.stringify(responses, null, 2));
  console.log(`Total cost: $${client.getTotalCost().toFixed(2)}`);

  console.log();
};

export default prompt;
