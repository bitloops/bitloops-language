import { TGeneratedInfra } from '../commands/prompt/invoker.js';
import { yieldModuleInfo } from '../utils/bounded-context-module.generator.js';
import { writeTargetFile } from './writeTargetFile.js';

export const writeAIResults = async (
  responses: TGeneratedInfra,
  targetDirPath: string,
): Promise<void> => {
  for (const { boundedContextName, moduleInfo } of yieldModuleInfo(
    responses.boundedContexts ?? {},
  )) {
    const { moduleDefinition, repositories, services } = moduleInfo;
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
  if (responses.api?.dtos) {
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename: 'dtos.ts',
      },
      fileContent: responses.api.dtos,
    });
  }
  if (responses.api?.grpcControllers) {
    const fileContent = responses.api.grpcControllers.join('\n');
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename: 'controllers.ts',
      },
      fileContent,
    });
  }
};
