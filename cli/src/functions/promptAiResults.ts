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
import { promptServiceMessages } from '../commands/prompt/data-sets/prompt-service.context.js';
// import { promptDtoMessages } from '../commands/prompt/data-sets/api/prompt-dto.context.js';
import { promptProtoMessages } from '../commands/prompt/data-sets/api/prompt-proto.context.js';
import { ConfigUtils } from '../utils/config.js';
import { promptProtoRealTimeStreamsMessages } from '../commands/prompt/data-sets/api/prompt-proto-real-time.context.js';
import { CodeSnippets } from '../commands/prompt/data-sets/common/code-snippets.js';
import {
  promptApiGrpcControllerCommand,
  promptApiGrpcControllerOnEventMethod,
  promptApiGrpcControllerQuery,
} from '../commands/prompt/data-sets/api/prompt-grpc-controller.context.js';
import { CasingUtils } from '../utils/casing.js';
import {
  ClassNameToTargetFileName,
  FileNameToClassName,
  getPubSubHandlerNameFromIntegrationEvent,
} from '../commands/prompt/data-sets/common/names.js';
import { promptPubSubHandlers } from '../commands/prompt/data-sets/api/prompt-pub-sub-handlers.context.js';
type ComponentsInfo = BoundedContextModulesInfo<{
  commandHandlers: TranspiledTypescriptFileInfo[];
  queryHandlers: TranspiledTypescriptFileInfo[];
  commands: TranspiledTypescriptFileInfo[];
  queries: TranspiledTypescriptFileInfo[];
  entities: TranspiledTypescriptFileInfo[];
  writeRepoPorts: TranspiledTypescriptFileInfo[];
  readRepoPorts: TranspiledTypescriptFileInfo[];
  servicePorts: TranspiledTypescriptFileInfo[];
  constantsFile: TranspiledTypescriptFileInfo;
  integrationEvents: TranspiledTypescriptFileInfo[];
}>;

export const extractComponentsFromFiles = (
  transpiledFiles: TranspiledTypescriptFilesAndContents,
): ComponentsInfo => {
  const componentsInfo: ComponentsInfo = {};
  for (const { boundedContextName, moduleInfo, moduleName } of yieldModuleInfo(transpiledFiles)) {
    // console.log(`Module ${moduleName} has ${moduleInfo.length} files`);

    const commandHandlers = moduleInfo.filter((m) => m.fileName.endsWith('.command-handler.ts'));
    const queryHandlers = moduleInfo.filter((m) => m.fileName.endsWith('.query-handler.ts'));
    const commands = moduleInfo.filter((m) => m.fileName.endsWith('.command.ts'));
    const queries = moduleInfo.filter((m) => m.fileName.endsWith('.query.ts'));
    const entities = moduleInfo.filter((m) => m.fileName.endsWith('.entity.ts'));

    const writeRepoPorts = moduleInfo.filter((m) => m.fileName.endsWith('write.repo-port.ts'));
    const readRepoPorts = moduleInfo.filter((m) => m.fileName.endsWith('read.repo-port.ts'));
    const servicePorts = moduleInfo.filter((m) => m.fileName.endsWith('.service-port.ts'));
    const constantsFiles = moduleInfo.filter((m) => m.fileName.endsWith('constants.ts'));

    const integrationEvents = moduleInfo.filter((m) =>
      m.fileName.endsWith('.integration-event.ts'),
    );

    if (!componentsInfo[boundedContextName]) {
      componentsInfo[boundedContextName] = {};
    }
    componentsInfo[boundedContextName][moduleName] = {
      commandHandlers,
      queryHandlers,
      commands,
      queries,
      entities,
      writeRepoPorts,
      readRepoPorts,
      servicePorts,
      constantsFile: constantsFiles[0],
      integrationEvents,
    };
    // console.log({
    //   commandHandlersLength: commandHandlers.length,
    //   queryHandlersLength: queryHandlers.length,
    //   commandsLength: commands.length,
    //   queriesLength: queries.length,
    //   writeRepoPortsLength: writeRepoPorts.length,
    //   readRepoPortsLength: readRepoPorts.length,
    //   servicePortsLength: servicePorts.length,
    //   constantsFileLength: constantsFiles.length,
    //   integrationEventsLength: integrationEvents.length,
    // });
  }
  return componentsInfo;
};

export type ExposedGrpcComponents = {
  handlersContent: string[];
  commandsContent: string[];
  queriesContent: string[];
  entitiesContent: string[];
  integrationEvents: TranspiledTypescriptFileInfo[];
};
export const extractGrpcExposedComponents = async (
  componentsInfo: ComponentsInfo,
): Promise<ExposedGrpcComponents> => {
  const { grpc } = await ConfigUtils.readBitloopsProjectConfigFile();

  const res: ExposedGrpcComponents = {
    handlersContent: [],
    commandsContent: [],
    queriesContent: [],
    entitiesContent: [],
    integrationEvents: [],
  };
  for (const { boundedContextName, moduleName, moduleInfo } of yieldModuleInfo(grpc.controllers)) {
    const { entities, handlers } = moduleInfo;
    for (const [handlerName, commandOrQueryName] of Object.entries(handlers)) {
      if (commandOrQueryName.endsWith('.command.ts')) {
        const commandFile = componentsInfo[boundedContextName][moduleName].commands.find(
          (x) => x.fileName === commandOrQueryName,
        );
        if (!commandFile)
          throw new Error('Exposing command that does not exist: ' + commandOrQueryName);
        res.commandsContent.push(commandFile.fileContent);
        const commandHandlerFile = componentsInfo[boundedContextName][
          moduleName
        ].commandHandlers.find((x) => x.fileName === handlerName);
        if (!commandHandlerFile)
          throw new Error('Exposing command handler that does not exist: ' + handlerName);
        res.handlersContent.push(commandHandlerFile.fileContent);
      } else if (commandOrQueryName.endsWith('.query.ts')) {
        const queryFile = componentsInfo[boundedContextName][moduleName].queries.find(
          (x) => x.fileName === commandOrQueryName,
        );
        if (!queryFile)
          throw new Error('Exposing query that does not exist: ' + commandOrQueryName);
        res.queriesContent.push(queryFile.fileContent);
        const queryHandlerFile = componentsInfo[boundedContextName][moduleName].queryHandlers.find(
          (x) => x.fileName === handlerName,
        );
        if (!queryHandlerFile)
          throw new Error('Exposing query handler that does not exist: ' + handlerName);
        res.handlersContent.push(queryHandlerFile.fileContent);
      }
    }

    entities.forEach((x) => {
      const entityFileContent = componentsInfo[boundedContextName][moduleName].entities.find(
        (y) => y.fileName === x,
      ).fileContent;
      if (!entityFileContent) throw new Error('Exposing entity that does not exist: ' + x);
      res.entitiesContent.push(entityFileContent);
    });
  }

  res.integrationEvents = Array.from(yieldModuleInfo(grpc['stream-events'])).flatMap(
    ({ boundedContextName, moduleName, moduleInfo: exposedIntegrationEventsFileNames }) =>
      exposedIntegrationEventsFileNames.map((fileName) => {
        const integrationEventFile = componentsInfo[boundedContextName][
          moduleName
        ].integrationEvents.find(
          (integrationEventFile) => integrationEventFile.fileName === fileName,
        );
        if (!integrationEventFile)
          throw new Error('Exposing integration event that does not exist: ' + fileName);
        return integrationEventFile;
      }),
  );
  return res;
};

export const promptAiResults = async (
  client: Client,
  componentsInfo: ComponentsInfo,
  exposedGrpcComponents: ExposedGrpcComponents,
): Promise<void> => {
  const { concretions, grpc } = await ConfigUtils.readBitloopsProjectConfigFile();
  for (const { boundedContextName, moduleInfo, moduleName } of yieldModuleInfo(componentsInfo)) {
    const { writeRepoPorts, readRepoPorts, servicePorts, constantsFile } = moduleInfo;
    const moduleNameInCamelCase = CasingUtils.kebabCaseToCamelCase(moduleName) + 'Module';
    const targetFileName = `${moduleName}.module.ts`;
    client.makeOpenAIRequest(
      promptModuleMessages(
        moduleNameInCamelCase,
        {
          boundedContext: boundedContextName,
          module: moduleName,
        },
        constantsFile.fileContent,
        concretions[boundedContextName][moduleName],
      ),
      {
        key: GENERATED_INFRA_KEYS.MODULE_DEFINITION(boundedContextName, moduleName),
        fileName: targetFileName,
      },
    );
    for (const writePort of writeRepoPorts) {
      const { fileName } = writePort;
      const concretion = concretions[boundedContextName][moduleName][fileName];
      if (!concretion) {
        console.error(`No concretion found for ${boundedContextName}-${moduleName}-${fileName}`);
        continue;
      }
      const className = FileNameToClassName.repository(fileName, concretion);
      const targetFileName = ClassNameToTargetFileName.repository(className);
      const metadata = { fileName };
      client.makeGPT4Request(
        promptWriteRepoMessages(
          writePort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        {
          key: GENERATED_INFRA_KEYS.REPOSITORIES(boundedContextName, moduleName),
          isArray: true,
          metadata,
          fileName: targetFileName,
        },
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
      const className = FileNameToClassName.repository(fileName, concretion);
      const targetFileName = ClassNameToTargetFileName.repository(className);
      client.makeOpenAIRequest(
        promptReadRepoMessages(
          readPort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        {
          key: GENERATED_INFRA_KEYS.REPOSITORIES(boundedContextName, moduleName),
          isArray: true,
          metadata,
          fileName: targetFileName,
        },
      );
    }
    for (const servicePort of servicePorts) {
      const { fileName } = servicePort;
      const concretion = concretions[boundedContextName][moduleName][fileName];
      const metadata = { fileName };
      const className = FileNameToClassName.service(fileName, concretion as any);
      const targetFileName = ClassNameToTargetFileName.service(className);
      if (!concretion) {
        console.error(`No concretion found for ${boundedContextName}-${moduleName}-${fileName}`);
        continue;
      }
      client.makeOpenAIRequest(
        promptServiceMessages(
          servicePort.fileContent,
          {
            boundedContext: boundedContextName,
            module: moduleName,
          },
          [fileName, concretion],
        ),
        {
          key: GENERATED_INFRA_KEYS.SERVICES(boundedContextName, moduleName),
          isArray: true,
          metadata: metadata,
          fileName: targetFileName,
        },
      );
    }
  }
  // const initialValue = {
  //   commands: [],
  //   queries: [],
  // };
  // const flattenComponentsInfo = Array.from(yieldModuleInfo(componentsInfo)).reduce(
  //   (acc, currentValue) => {
  //     acc.commands.push(currentValue.moduleInfo.commands.map((x) => x.fileContent));
  //     acc.queries.push(currentValue.moduleInfo.queries.map((x) => x.fileContent));
  //     return acc;
  //   },
  //   initialValue,
  // );
  // client.makeOpenAIRequest(
  //   GENERATED_INFRA_KEYS.API_DTO,
  //   promptDtoMessages(flattenComponentsInfo.commands, flattenComponentsInfo.queries),
  //   true,
  //   {
  //     commandsLength: flattenComponentsInfo.commands.length,
  //     queriesLength: flattenComponentsInfo.queries.length,
  //   },
  // );

  /**
   * Grpc stuff
   */
  const { handlersContent, commandsContent, queriesContent, entitiesContent } =
    exposedGrpcComponents;

  client.makeOpenAIRequest(
    promptProtoMessages(
      grpc.package,
      grpc['service-name'],
      handlersContent,
      commandsContent,
      queriesContent,
      entitiesContent,
    ),
    { key: GENERATED_INFRA_KEYS.API_PROTO_BUFF },
  );
};

/**
 * Adds real-time stuff in protobuf file.
 */
export const promptAiResultsSecondRound = (
  client: Client,
  responses: TGeneratedInfra,
  exposedGrpcComponents: ExposedGrpcComponents,
): void => {
  const protobuf = responses.api.protobuff;

  const { integrationEvents } = exposedGrpcComponents;

  client.makeOpenAIRequest(
    promptProtoRealTimeStreamsMessages(
      CodeSnippets.sanitizeProto(protobuf.fileContent),
      integrationEvents.map((x) => FileNameToClassName.integrationEvent(x.fileName)),
    ),
    {
      key: GENERATED_INFRA_KEYS.API_PROTO_BUFF,
    },
  );
};

/**
 *  Creates the grpc controllers.
 */
export const promptAiResultsThirdRound = async (
  client: Client,
  responses: TGeneratedInfra,
  exposedGrpcComponents: ExposedGrpcComponents,
): Promise<void> => {
  const protobuf = responses.api.protobuff;
  const { grpc } = await ConfigUtils.readBitloopsProjectConfigFile();
  const { queriesContent, commandsContent, integrationEvents } = exposedGrpcComponents;

  const commandsAtATimeNum = 1;
  const totalExposedCommandsLength = commandsContent.length;
  for (let i = 0; i < totalExposedCommandsLength; i += commandsAtATimeNum) {
    const toIndex =
      i + commandsAtATimeNum > totalExposedCommandsLength
        ? totalExposedCommandsLength
        : i + commandsAtATimeNum;
    const slice = commandsContent.slice(i, toIndex);
    client.makeOpenAIRequest(
      promptApiGrpcControllerCommand(
        slice[0],
        CodeSnippets.sanitizeProto(protobuf.fileContent),
        grpc.package,
      ),
      { key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER, isArray: true },
    );
  }
  const queriesAtATimeNum = 1;
  const totalExposedQueriesLength = queriesContent.length;
  for (let i = 0; i < totalExposedQueriesLength; i += queriesAtATimeNum) {
    const toIndex =
      i + queriesAtATimeNum > totalExposedQueriesLength
        ? totalExposedQueriesLength
        : i + queriesAtATimeNum;
    const slice = queriesContent.slice(i, toIndex);
    client.makeOpenAIRequest(
      promptApiGrpcControllerQuery(
        slice[0],
        CodeSnippets.sanitizeProto(protobuf.fileContent),
        grpc.package,
      ),
      { key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER, isArray: true },
    );
  }

  const integrationEventNames = integrationEvents.map((x) =>
    FileNameToClassName.integrationEvent(x.fileName),
  );
  client.makeOpenAIRequest(
    promptApiGrpcControllerOnEventMethod(
      CodeSnippets.sanitizeProto(protobuf.fileContent),
      integrationEventNames,
      grpc.package,
      grpc['service-name'],
    ),
    { key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER, isArray: true },
  );

  /**
   * Grpc PubSub handlers
   */
  for (const integrationEvent of integrationEvents) {
    const integrationEventName = FileNameToClassName.integrationEvent(integrationEvent.fileName);
    const integrationEventFileContent = integrationEvent.fileContent;

    const handlerClassName = getPubSubHandlerNameFromIntegrationEvent(integrationEventName);
    const fileName = ClassNameToTargetFileName.pubsubHandler(handlerClassName);

    client.makeOpenAIRequest(
      promptPubSubHandlers(
        CodeSnippets.sanitizeProto(protobuf.fileContent),
        integrationEventFileContent,
        integrationEventName,
        grpc.package,
      ),
      {
        key: GENERATED_INFRA_KEYS.API_GRPC_PUBSUB_HANDLERS,
        isArray: true,
        fileName,
      },
    );
  }
};
