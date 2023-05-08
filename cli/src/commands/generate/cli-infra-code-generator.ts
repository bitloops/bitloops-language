import { yieldModuleInfo } from '../../utils/bounded-context-module.generator.js';
import { CasingUtils } from '../../utils/casing.js';
import { BitloopsProjectConfig } from '../../utils/config.js';
import { Client } from './client.js';
import {
  promptApiGrpcControllerCommand,
  promptApiGrpcControllerOnEventMethod,
  promptApiGrpcControllerQuery,
} from './data-sets/api/prompt-grpc-controller.context.js';
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

    console.log('Generating protobuf file...');
    this.promptAiResultsSecondRound(client, responses, exposedGrpcComponents);
    responses = await client.getResponses();

    console.log('Generating api...');
    await this.promptAiResultsThirdRound(client, responses, exposedGrpcComponents);
    responses = await client.getResponses();
    this.totalCost = client.getTotalCost();
    return responses;
  }

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
  }

  /**
   * Adds real-time stuff in protobuf file.
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
   *  Creates the grpc controllers,by adding controller commands/queries methods.
   *  Add on-Event method of controller.
   *  Generate Grpc PubSub handlers.
   */
  private async promptAiResultsThirdRound(
    client: Client,
    responses: TGeneratedInfra,
    exposedGrpcComponents: ExposedGrpcComponents,
  ): Promise<void> {
    const protobuf = responses.api.protobuff;
    const { grpc } = this.bitloopsProjectConfig.api;
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
        {
          key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
          isArray: true,
        },
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
        {
          key: GENERATED_INFRA_KEYS.API_GRPC_CONTROLLER,
          isArray: true,
        },
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
