import { GrpcControllerBuilder } from '../component-builders/api/grpc-controller.builder.js';
// import { GrpcPubSubHandlerBuilder } from '../commands/prompt/component-builders/api/grpc-pub-sub-handler.builder.js';
import { CodeSnippets } from '../data-sets/common/code-snippets.js';
import { FileNameToClassName } from '../data-sets/common/names.js';
import { ExposedGrpcComponents } from '../interfaces/infra-code-generator.js';
import { TGeneratedInfra } from '../invoker.js';
import { yieldModuleInfo } from '../../../utils/bounded-context-module.generator.js';
import { ConfigUtils } from '../../../utils/config.js';
import { writeTargetFile } from '../../../functions/writeTargetFile.js';

// TODO Refactor this function to be more readable & extendable
// Introduce file-types and have a switch or object deciding filePaths and fileContents
// Also make all file operations async
export const writeAIResults = async (
  responses: TGeneratedInfra,
  targetDirPath: string,
  exposedGrpcComponents: ExposedGrpcComponents,
): Promise<void> => {
  const boundedContexts = responses.boundedContexts ?? {};
  for (const { boundedContextName, moduleName, moduleInfo } of yieldModuleInfo(boundedContexts)) {
    const baseModulePath = `bounded-contexts/${boundedContextName}/${moduleName}`;
    const { moduleDefinition, repositories, services } = moduleInfo;
    for (const repo of repositories ?? []) {
      const { fileName, fileContent } = repo;
      if (!fileName) {
        throw new Error('fileName is required for repo');
      }
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: `${baseModulePath}/repositories`,
          filename: fileName,
        },
        fileContent: CodeSnippets.sanitizeTypescript(fileContent),
      });
    }
    if (moduleDefinition) {
      if (!moduleDefinition.fileName) {
        throw new Error('fileName is required for moduleDefinition');
      }
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: baseModulePath,
          filename: moduleDefinition.fileName,
        },
        fileContent: CodeSnippets.sanitizeTypescript(moduleDefinition.fileContent),
      });
    }

    for (const service of services ?? []) {
      const { fileName, fileContent } = service;
      if (!fileName) {
        throw new Error('fileName is required for service');
      }
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: `${baseModulePath}/services`,
          filename: fileName,
        },
        fileContent: CodeSnippets.sanitizeTypescript(fileContent),
      });
    }
  }

  if (responses.api?.protobuff) {
    const { api } = await ConfigUtils.readBitloopsProjectConfigFile();
    const { grpc } = api;
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'proto',
        filename: grpc.package + '.proto',
      },
      fileContent: CodeSnippets.sanitizeProto(responses.api.protobuff.fileContent),
    });
  }
  if (responses.api?.dtos) {
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename: 'dtos.ts',
      },
      fileContent: responses.api.dtos
        .map((x) => CodeSnippets.sanitizeTypescript(x.fileContent))
        .join('\n'),
    });
  }
  if (responses.api?.grpcControllers) {
    const { api } = await ConfigUtils.readBitloopsProjectConfigFile();
    const { grpc } = api;
    const integrationEventClassNames = exposedGrpcComponents.integrationEvents.map((x) =>
      FileNameToClassName.integrationEvent(x.fileName),
    );
    const controllerContent = GrpcControllerBuilder.assemble(
      responses.api.grpcControllers.map((x) => x.fileContent),
      grpc.package,
      grpc['service-name'],
      integrationEventClassNames,
    );

    const filename = grpc.package + '.grpc.controller.ts';
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename,
      },
      fileContent: controllerContent,
    });
  }
  if (responses.api?.grpcPubSubHandlers) {
    for (const handler of responses.api.grpcPubSubHandlers) {
      const { fileName, fileContent } = handler;
      if (!fileName) {
        throw new Error('fileName is required for handler');
      }
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: 'api/pub-sub-handlers',
          filename: fileName,
        },
        fileContent: CodeSnippets.sanitizeTypescript(fileContent),
      });
    }
  }
};
