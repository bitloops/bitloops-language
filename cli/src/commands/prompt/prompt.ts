import fs from 'fs';
import { copyrightSnippet } from '../copyright.js';
import { ConfigUtils } from '../../utils/config.js';
import inquirer, { Question } from 'inquirer';
import { inquirerFuzzy as inquirerPath } from '../../utils/inquirer.js';
import { Client } from './client.js';
import { getBoundedContextModules } from '../../functions/index.js';
import { TBoundedContextName, TModuleName } from '../../types.js';
import path from 'path';
import { getTypescriptFilesAndContents } from '../../functions/readFilesContents.js';
import { writeAIResults } from '../../functions/writeAiResults.js';
import { promptAiResults, promptAiResultsSecondRound } from '../../functions/promptAiResults.js';
/**
 * TODO add a json or yaml config file, where the user can set settings for preferred repo adapters
 * for each port(file-name as a key), and e.g. MongoDB as value
 * Also which command/query handlers he wishes to expose through the API
 */

interface ICollection {
  targetDirPath: string;
}
const apiKeyQuestion: Question = {
  // type: 'input',
  name: 'apiKey',
  message: '📦 What is your open-ai key?',
};
const questions: Question[] = [
  {
    name: 'sourceDirPath',
    message: '📦 Where is your transpiled code located?(path of lib)',
    default: '.',
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

    const answers = await inquirer.prompt([apiKeyQuestion]);
    const { apiKey: newApiKey } = answers;
    await ConfigUtils.writeApiKey(newApiKey);
    apiKey = newApiKey;
  }
  const answers = [];
  for (const q of questions) {
    answers.push(await inquirerPath(q, source));
  }
  const [sourceDirPath, targetDirPath] = answers;
  console.log({ sourceDirPath, targetDirPath });
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }

  const sourceDirPathBoundedContext = path.join(sourceDirPath, 'bounded-contexts');

  const boundedContextModules: Record<TBoundedContextName, TModuleName[]> =
    getBoundedContextModules(sourceDirPathBoundedContext);

  const transpiledFiles = await getTypescriptFilesAndContents(
    boundedContextModules,
    sourceDirPathBoundedContext,
  );

  // Example usage
  const client = new Client(apiKey);
  await promptAiResults(client, transpiledFiles);
  let responses = await client.getResponses();
  console.log('Waiting for openai responses...');
  // client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API, promptApiGrpcController());
  promptAiResultsSecondRound(client, responses);
  responses = await client.getResponses();

  console.log(responses);
  // console.log(JSON.stringify(responses, null, 2));
  console.log(`Total cost: $${client.getTotalCost().toFixed(2)}`);
  await writeAIResults(responses, targetDirPath);
  console.log();
};

export default prompt;
