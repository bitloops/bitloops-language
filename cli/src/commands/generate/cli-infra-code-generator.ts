import { yieldModuleInfo } from '../../utils/bounded-context-module.generator.js';
import { CasingUtils } from '../../utils/casing.js';
import { BitloopsProjectConfig } from '../../utils/config.js';
import { Client } from './client.js';
import { promptApiGrpcControllerCommand } from './data-sets/api/controller/prompt-grpc-controller-command-method.context.js';
import { promptApiGrpcControllerOnEventMethod } from './data-sets/api/controller/prompt-grpc-controller-on-method.context copy.js';
import { promptApiGrpcControllerQuery } from './data-sets/api/controller/prompt-grpc-controller-query-method.context.js';
import { promptProtoRealTimeStreamsMessages } from './data-sets/api/prompt-proto-real-time.context.js';
import { promptProtoMessages } from './data-sets/api/prompt-proto.context.js';
import { promptPubSubHandlers } from './data-sets/api/prompt-pub-sub-handlers.context.js';
import { CodeSnippets } from './data-sets/common/code-snippets.js';
import {
  ClassNameToTargetFileName,
  FileNameToClassName,
  getPubSubHandlerNameFromIntegrationEvent,
} from './data-sets/common/names.js';
import { promptModuleMessages } from './data-sets/prompt-module.context.js';
import { promptReadRepoMessages } from './data-sets/prompt-read-repo.context.js';
import { promptServiceMessages } from './data-sets/prompt-service.context.js';
import { promptWriteRepoMessages } from './data-sets/prompt-write-repo.context.js';
import {
  ComponentsInfo,
  ExposedGrpcComponents,
  IInfraCodeGenerator,
} from './interfaces/infra-code-generator.js';
import { GENERATED_INFRA_KEYS, TGeneratedInfra } from './invoker.js';

export class CliInfraCodeGenerator implements IInfraCodeGenerator {
  private _totalCost: number;

  constructor(
    private readonly apiKey: string,
    private readonly bitloopsProjectConfig: BitloopsProjectConfig,
  ) {}

  get totalCost(): number {
    return this._totalCost;
  }

  private set totalCost(value: number) {
    this._totalCost = value;
  }

  async generate(params: {
    componentsInfo: ComponentsInfo;
    exposedGrpcComponents: ExposedGrpcComponents;
  }): Promise<TGeneratedInfra> {
    const { componentsInfo, exposedGrpcComponents } = params;
    const client = new Client(this.apiKey);
    console.log('Generating bounded contexts...');
    await this.promptAiResultsFirstRound(client, componentsInfo, exposedGrpcComponents);
    let responses = await client.getResponses();

    if (this.needsGrpcStreamEvents(exposedGrpcComponents)) {
      console.log('Generating protobuf file stream events...');
      this.promptAiResultsSecondRound(client, responses, exposedGrpcComponents);
      responses = await client.getResponses();
    }
    console.log('Generating api controllers...');
    await this.promptAiResultsThirdRound(client, responses, exposedGrpcComponents);
    responses = await client.getResponses();
    this.totalCost = client.getTotalCost();
    return responses;
  }

  /**
   *  For each module, prompt the AI for the following:
   * - WriteRepo concretions
   * - ReadRepo concretions
   * - Service concretions
   * - Module file
   *
   * Generate proto file, for all exposed commands and queries
   *
   */
  private async promptAiResultsFirstRound(
    client: Client,
    componentsInfo: ComponentsInfo,
    exposedGrpcComponents: ExposedGrpcComponents,
  ): Promise<void> {
    const { concretions, api } = this.bitloopsProjectConfig;
    const { grpc } = api;
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
            fileName: targetFileName,
          },
        );
      }
      for (const servicePort of servicePorts) {
        const { fileName } = servicePort;
        const concretion = concretions[boundedContextName][moduleName][fileName];
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
            fileName: targetFileName,
          },
        );
      }
    }

    /**
     * Grpc stuff
     */
    const { handlersContent, commands, queries, entitiesContent } = exposedGrpcComponents;

    client.makeOpenAIRequest(
      promptProtoMessages(
        grpc.package,
        grpc['service-name'],
        handlersContent,
        commands.map((command) => command.content),
        queries.map((query) => query.content),
        entitiesContent,
      ),
      { key: GENERATED_INFRA_KEYS.API_PROTO_BUFF },
    );
  }

  private needsGrpcStreamEvents(exposedGrpcComponents: ExposedGrpcComponents): boolean {
    const { integrationEvents } = exposedGrpcComponents;
    return integrationEvents.length > 0;
  }
  /**
   * Adds real-time stuff in protobuf file.
   *
   * Depends on the basic proto-file generated in the first round.
   * Which has commands & queries definitions.
   * Because it overrides the service by adding the real-time stuff.
   */
  private promptAiResultsSecondRound(
    client: Client,
    responses: TGeneratedInfra,
    exposedGrpcComponents: ExposedGrpcComponents,
  ): void {
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
  }

  /**
   *  - Creates the grpc controllers,by adding controller commands/queries methods.
   *  - Add on-Event method of controller.
   *  - Generates Grpc PubSub handlers.
   */
  private async promptAiResultsThirdRound(
    client: Client,
    responses: TGeneratedInfra,
    exposedGrpcComponents: ExposedGrpcComponents,
  ): Promise<void> {
    const protobuf = responses.api.protobuff;
    const { grpc } = this.bitloopsProjectConfig.api;
    const { queries, commands, integrationEvents } = exposedGrpcComponents;

    const commandsAtATimeNum = 1;
    const totalExposedCommandsLength = commands.length;
    // We loop this way to add support for 2+ commands at a time.
    for (let i = 0; i < totalExposedCommandsLength; i += commandsAtATimeNum) {
      const toIndex =
        i + commandsAtATimeNum > totalExposedCommandsLength
          ? totalExposedCommandsLength
          : i + commandsAtATimeNum;
      const slice = commands.slice(i, toIndex);
      const currentCommand = slice[0];
      const commandContext = {
        boundedContextName: currentCommand.boundedContextName,
        moduleName: currentCommand.moduleName,
      };
      client.makeOpenAIRequest(
        promptApiGrpcControllerCommand(
          currentCommand.content,
          currentCommand.commandHandlerContent,
          CodeSnippets.sanitizeProto(protobuf.fileContent),
          grpc.package,
          commandContext,
        ),
        {
          key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
          isArray: true,
        },
      );
    }
    const queriesAtATimeNum = 1;
    const totalExposedQueriesLength = queries.length;
    for (let i = 0; i < totalExposedQueriesLength; i += queriesAtATimeNum) {
      const toIndex =
        i + queriesAtATimeNum > totalExposedQueriesLength
          ? totalExposedQueriesLength
          : i + queriesAtATimeNum;
      const slice = queries.slice(i, toIndex);
      const currentQuery = slice[0];
      const queryContext = {
        boundedContextName: currentQuery.boundedContextName,
        moduleName: currentQuery.moduleName,
      };
      client.makeOpenAIRequest(
        promptApiGrpcControllerQuery(
          currentQuery.content,
          currentQuery.queryHandlerContent,
          CodeSnippets.sanitizeProto(protobuf.fileContent),
          grpc.package,
          queryContext,
        ),
        {
          key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
          isArray: true,
        },
      );
    }

    if (!this.needsGrpcStreamEvents(exposedGrpcComponents)) {
      return;
    }
    const integrationEventNames = integrationEvents.map((x) =>
      FileNameToClassName.integrationEvent(x.fileName),
    );
    const grpcServiceName = grpc['service-name'];
    client.makeOpenAIRequest(
      promptApiGrpcControllerOnEventMethod(
        CodeSnippets.sanitizeProto(protobuf.fileContent),
        integrationEventNames,
        grpc.package,
        grpcServiceName,
      ),
      {
        key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
        isArray: true,
      },
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
  }
}
