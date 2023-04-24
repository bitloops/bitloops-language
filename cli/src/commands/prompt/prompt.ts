import fs from 'fs';
import { copyrightSnippet } from '../copyright.js';
import { ConfigUtils } from '../../utils/config.js';
import inquirer, { Question } from 'inquirer';
import { inquirerFuzzy as inquirerPath } from '../../utils/inquirer.js';
import { promptWriteRepoMessages } from './data-sets/prompt-write-repo.context.js';
import { Client } from './client.js';
import { GENERATED_INFRA_KEYS } from './invoker.js';
import { writeTargetFile } from '../../functions/writeTargetFile.js';
import { promptReadRepoMessages } from './data-sets/prompt-read-repo.context.js';
import { promptModuleMessages } from './data-sets/prompt-module.context.js';
import { promptServiceMessages } from './data-sets/prompt-service.context.js';
import { promptProtoMessages } from './data-sets/api/prompt-proto.context.js';
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
  const [targetDirPath] = answers;
  // console.log({ targetDirPath });
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }

  // Example usage
  const client = new Client(apiKey);

  // client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API, promptApiGrpcController());
  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.MODULE_DEFINITION('todo', 'todo'),
  //   promptModuleMessages(undefined, {
  //     boundedContext: 'todo',
  //     module: 'todo',
  //   }),
  // );
  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.REPOSITORIES('iam', 'authentication'),
  //   promptWriteRepoMessages(undefined, {
  //     boundedContext: 'iam',
  //     module: 'authentication',
  //   }),
  //   true,
  // );
  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.REPOSITORIES('todo', 'todo'),
  //   promptReadRepoMessages(undefined, {
  //     boundedContext: 'todo',
  //     module: 'todo',
  //   }),
  //   true,
  // );
  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.SERVICES('todo', 'todo'),
  //   promptServiceMessages(undefined, {
  //     boundedContext: 'todo',
  //     module: 'todo',
  //   }),
  //   true,
  // );
  client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API_PROTO_BUFF, promptProtoMessages());
  const responses = await client.getResponses();
  console.log(responses);
  // console.log(JSON.stringify(responses, null, 2));
  console.log(`Total cost: $${client.getTotalCost().toFixed(2)}`);

  for (const [boundedContextName, boundedContext] of Object.entries(
    responses.boundedContexts ?? {},
  )) {
    for (const [_moduleName, module] of Object.entries(boundedContext)) {
      const { moduleDefinition, repositories, services } = module;
      let counter = 0;
      for (const repo of repositories ?? []) {
        writeTargetFile({
          projectPath: targetDirPath,
          filePathObj: {
            path: boundedContextName,
            filename: 'a' + counter++ + '.ts',
          },
          fileContent: repo,
        });
      }
      if (moduleDefinition) {
        writeTargetFile({
          projectPath: targetDirPath,
          filePathObj: {
            path: boundedContextName,
            filename: 'c' + counter++ + '.ts',
          },
          fileContent: moduleDefinition,
        });
      }

      for (const service of services ?? []) {
        writeTargetFile({
          projectPath: targetDirPath,
          filePathObj: {
            path: boundedContextName,
            filename: 's' + counter++ + '.ts',
          },
          fileContent: service,
        });
      }
    }
  }

  if (responses.api?.protobuff) {
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename: 'file.proto',
      },
      fileContent: responses.api.protobuff,
    });
  }

  console.log();
};

export default prompt;
