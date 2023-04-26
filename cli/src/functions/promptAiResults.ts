import { promptModuleMessages } from '../commands/prompt/data-sets/prompt-module.context.js';
import { promptReadRepoMessages } from '../commands/prompt/data-sets/prompt-read-repo.context.js';
import { promptWriteRepoMessages } from '../commands/prompt/data-sets/prompt-write-repo.context.js';
import { GENERATED_INFRA_KEYS, TGeneratedInfra } from '../commands/prompt/invoker.js';
import {
  BoundedContextModulesInfo,
  yieldModuleInfo,
} from '../utils/bounded-context-module.generator.js';
import { Client } from '../commands/prompt/client.js';
import {
  TranspiledTypescriptFileInfo,
  TranspiledTypescriptFilesAndContents,
} from './readFilesContents.js';
import { CasingUtils } from '../utils/casing.js';
import { promptServiceMessages } from '../commands/prompt/data-sets/prompt-service.context.js';
import { promptDtoMessages } from '../commands/prompt/data-sets/api/prompt-dto.context.js';
import { promptProtoMessages } from '../commands/prompt/data-sets/api/prompt-proto.context.js';
import { ConfigUtils } from '../utils/config.js';
import { promptProtoRealTimeStreamsMessages } from '../commands/prompt/data-sets/api/prompt-proto-real-time.context.js';
import { CodeSnippets } from '../commands/prompt/data-sets/common/code-snippets.js';

export const promptAiResults = async (
  client: Client,
  transpiledFiles: TranspiledTypescriptFilesAndContents,
): Promise<void> => {
  const apiInfo: BoundedContextModulesInfo<{
    commandHandlers: TranspiledTypescriptFileInfo[];
    queryHandlers: TranspiledTypescriptFileInfo[];
    commands: TranspiledTypescriptFileInfo[];
    queries: TranspiledTypescriptFileInfo[];
    entities: TranspiledTypescriptFileInfo[];
  }> = {};

  const { concretions, grpc } = await ConfigUtils.readBitloopsProjectConfigFile();
  for (const { boundedContextName, moduleInfo, moduleName } of yieldModuleInfo(transpiledFiles)) {
    console.log(`Module ${moduleName} has ${moduleInfo.length} files`);

    const commandHandlers = moduleInfo.filter((m) => m.fileName.endsWith('.command-handler.ts'));
    const queryHandlers = moduleInfo.filter((m) => m.fileName.endsWith('.query-handler.ts'));
    const commands = moduleInfo.filter((m) => m.fileName.endsWith('.command.ts'));
    const queries = moduleInfo.filter((m) => m.fileName.endsWith('.query.ts'));
    const entities = moduleInfo.filter((m) => m.fileName.endsWith('.entity.ts'));

    const writeRepoPorts = moduleInfo.filter((m) => m.fileName.endsWith('write.repo-port.ts'));
    const readRepoPorts = moduleInfo.filter((m) => m.fileName.endsWith('read.repo-port.ts'));
    const servicePorts = moduleInfo.filter((m) => m.fileName.endsWith('.service-port.ts'));
    const constantsFile = moduleInfo.filter((m) => m.fileName.endsWith('constants.ts'));
    if (!apiInfo[boundedContextName]) {
      apiInfo[boundedContextName] = {};
    }
    apiInfo[boundedContextName][moduleName] = {
      commandHandlers,
      queryHandlers,
      commands,
      queries,
      entities,
    };
    console.log({
      commandHandlersLength: commandHandlers.length,
      queryHandlersLength: queryHandlers.length,
      commandsLength: commands.length,
      queriesLength: queries.length,
      writeRepoPortsLength: writeRepoPorts.length,
      readRepoPortsLength: readRepoPorts.length,
      servicePortsLength: servicePorts.length,
      constantsFileLength: constantsFile.length,
    });

    const moduleNameInCamelCase = CasingUtils.kebabCaseToCamelCase(moduleName) + 'Module';
    client.makeOpenAIRequest(
      GENERATED_INFRA_KEYS.MODULE_DEFINITION(boundedContextName, moduleName),
      promptModuleMessages(
        moduleNameInCamelCase,
        {
          boundedContext: boundedContextName,
          module: moduleName,
        },
        constantsFile[0]?.fileContent,
        concretions[boundedContextName][moduleName],
      ),
    );

    for (const writePort of writeRepoPorts) {
      const { fileName } = writePort;
      const concretion = concretions[boundedContextName][moduleName][fileName];
      if (!concretion) {
        console.error(`No concretion found for ${boundedContextName}-${moduleName}-${fileName}`);
        continue;
      }
      const metadata = { fileName };
      client.makeOpenAIRequest(
        GENERATED_INFRA_KEYS.REPOSITORIES(boundedContextName, moduleName),
        promptWriteRepoMessages(
          writePort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        true,
        metadata,
      );
    }

    for (const readPort of readRepoPorts) {
      const { fileName } = readPort;
      const concretion = concretions[boundedContextName][moduleName][fileName];
      if (!concretion) {
        console.error(`No concretion found for ${boundedContextName}-${moduleName}-${fileName}`);
        continue;
      }
      const metadata = { fileName };
      client.makeOpenAIRequest(
        GENERATED_INFRA_KEYS.REPOSITORIES(boundedContextName, moduleName),
        promptReadRepoMessages(
          readPort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        true,
        metadata,
      );
    }

    for (const servicePort of servicePorts) {
      const { fileName } = servicePort;
      const concretion = concretions[boundedContextName][moduleName][fileName];
      if (!concretion) {
        console.error(`No concretion found for ${boundedContextName}-${moduleName}-${fileName}`);
        continue;
      }
      client.makeOpenAIRequest(
        GENERATED_INFRA_KEYS.SERVICES(boundedContextName, moduleName),
        promptServiceMessages(
          servicePort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        true,
      );
    }
  }
  const initialValue = {
    commands: [],
    queries: [],
  };
  const flattenApiInfo = Array.from(yieldModuleInfo(apiInfo)).reduce((acc, currentValue) => {
    acc.commands.push(currentValue.moduleInfo.commands.map((x) => x.fileContent));
    acc.queries.push(currentValue.moduleInfo.queries.map((x) => x.fileContent));
    return acc;
  }, initialValue);
  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.API_DTO,
    promptDtoMessages(flattenApiInfo.commands, flattenApiInfo.queries),
    true,
    {
      commandsLength: flattenApiInfo.commands.length,
      queriesLength: flattenApiInfo.queries.length,
    },
  );

  /**
   * Grpc stuff
   */
  const exposedHandlers = [];
  const exposedCommands = [];
  const exposedQueries = [];
  const entities = [];
  for (const { boundedContextName, moduleName, moduleInfo } of yieldModuleInfo(grpc.controllers)) {
    const { entities, handlers } = moduleInfo;
    for (const [handlerName, commandOrQueryName] of Object.entries(handlers)) {
      if (commandOrQueryName.endsWith('.command.ts')) {
        const command = apiInfo[boundedContextName][moduleName].commands.find(
          (x) => x.fileName === commandOrQueryName,
        );
        if (!command)
          throw new Error('Exposing command that does not exist: ' + commandOrQueryName);
        exposedCommands.push(command.fileContent);
        const commandHandler = apiInfo[boundedContextName][moduleName].commandHandlers.find(
          (x) => x.fileName === handlerName,
        );
        if (!commandHandler)
          throw new Error('Exposing command handler that does not exist: ' + handlerName);
        exposedHandlers.push(commandHandler.fileContent);
      } else if (commandOrQueryName.endsWith('.query.ts')) {
        const query = apiInfo[boundedContextName][moduleName].queries.find(
          (x) => x.fileName === commandOrQueryName,
        );
        if (!query) throw new Error('Exposing query that does not exist: ' + commandOrQueryName);
        exposedQueries.push(commandOrQueryName);
        const queryHandler = apiInfo[boundedContextName][moduleName].queryHandlers.find(
          (x) => x.fileName === handlerName,
        );
        if (!queryHandler)
          throw new Error('Exposing query handler that does not exist: ' + handlerName);
        exposedHandlers.push(queryHandler.fileContent);
      }
    }

    entities.push(...apiInfo[boundedContextName][moduleName].entities.map((x) => x.fileContent));
  }

  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.API_PROTO_BUFF,
    promptProtoMessages(
      grpc.package,
      grpc['service-name'],
      exposedHandlers,
      exposedCommands,
      exposedQueries,
      entities,
    ),
  );

  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
  //   promptApiGrpcController(),
  //   true,
  // );
};

export const promptAiResultsSecondRound = (client: Client, responses: TGeneratedInfra): void => {
  const protobuf = responses.api.protobuff;

  client.makeOpenAIRequest(
    GENERATED_INFRA_KEYS.API_PROTO_BUFF,
    promptProtoRealTimeStreamsMessages(CodeSnippets.sanitizeProto(protobuf)),
  );
};
