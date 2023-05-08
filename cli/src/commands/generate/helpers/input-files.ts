import { TranspiledTypescriptFilesAndContents } from '../../../functions/readFilesContents.js';
import { yieldModuleInfo } from '../../../utils/bounded-context-module.generator.js';
import { BitloopsProjectConfig } from '../../../utils/config.js';
import { ComponentsInfo, ExposedGrpcComponents } from '../interfaces/infra-code-generator.js';

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

export const extractGrpcExposedComponents = async (
  componentsInfo: ComponentsInfo,
  bitloopsProjectConfig: BitloopsProjectConfig,
): Promise<ExposedGrpcComponents> => {
  const { api } = bitloopsProjectConfig;
  const { grpc } = api;

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
