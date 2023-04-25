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
import { promptDtoMessages } from './data-sets/api/prompt-dto.context.js';
import { promptApiGrpcController } from './data-sets/api/prompt-grpc-controller.context.js';
import { getBitloopsFilesAndContents, getBoundedContextModules } from '../../functions/index.js';
import { TBoundedContextName, TModuleName } from '../../types.js';
import path from 'path';
import { getTypescriptFilesAndContents } from '../../functions/readFilesContents.js';
import { yieldModuleInfo } from '../../utils/bounded-context-module.generator.js';
import { writeAIResults } from '../../functions/writeAiResults.js';
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

  for (const { moduleInfo, moduleName } of yieldModuleInfo(transpiledFiles)) {
    console.log(`Module ${moduleName} has ${moduleInfo.length} files`);

    const handlers = moduleInfo.filter((m) => m.fileName.endsWith('.handler.ts'));
    const commands = moduleInfo.filter((m) => m.fileName.endsWith('.command.ts'));
    const queries = moduleInfo.filter((m) => m.fileName.endsWith('.query.ts'));

    const repoPorts = moduleInfo.filter((m) => m.fileName.endsWith('.repo-port.ts'));
    const servicePorts = moduleInfo.filter((m) => m.fileName.endsWith('.service-port.ts'));
    console.log({
      handlersLength: handlers.length,
      commandsLength: commands.length,
      queriesLength: queries.length,
      repoPortsLength: repoPorts.length,
      servicePortsLength: servicePorts.length,
    });
  }

  console.log('Waiting for openai responses...');
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
  // client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API_PROTO_BUFF, promptProtoMessages());
  // client.makeOpenAIRequest(GENERATED_INFRA_KEYS.API_DTO, promptDtoMessages());
  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
    promptApiGrpcController(),
    true,
  );

  const responses = await client.getResponses();
  console.log(responses);
  // console.log(JSON.stringify(responses, null, 2));
  console.log(`Total cost: $${client.getTotalCost().toFixed(2)}`);
  await writeAIResults(responses, targetDirPath);
  console.log();
};

export default prompt;
