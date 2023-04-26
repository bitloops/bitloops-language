import { CodeSnippets } from '../commands/prompt/data-sets/common/code-snippets.js';
import { TGeneratedInfra } from '../commands/prompt/invoker.js';
import { yieldModuleInfo } from '../utils/bounded-context-module.generator.js';
import { writeTargetFile } from './writeTargetFile.js';

export const writeAIResults = async (
  responses: TGeneratedInfra,
  targetDirPath: string,
): Promise<void> => {
  const boundedContexts = responses.boundedContexts ?? {};
  for (const { boundedContextName, moduleName, moduleInfo } of yieldModuleInfo(boundedContexts)) {
    const baseModulePath = `bounded-contexts/${boundedContextName}/${moduleName}`;
    const { moduleDefinition, repositories, services } = moduleInfo;
    let counter = 0;
    for (const repo of repositories ?? []) {
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: `${baseModulePath}/repositories`,
          filename: 'repo' + counter++ + '.ts',
        },
        fileContent: CodeSnippets.sanitizeTypescript(repo),
      });
    }
    if (moduleDefinition) {
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: baseModulePath,
          filename: 'moduleDef' + counter++ + '.ts',
        },
        fileContent: CodeSnippets.sanitizeTypescript(moduleDefinition),
      });
    }

    for (const service of services ?? []) {
      writeTargetFile({
        projectPath: targetDirPath,
        filePathObj: {
          path: `${baseModulePath}/services`,
          filename: 'service' + counter++ + '.ts',
        },
        fileContent: CodeSnippets.sanitizeTypescript(service),
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
      fileContent: CodeSnippets.sanitizeProto(responses.api.protobuff),
    });
  }
  if (responses.api?.dtos) {
    writeTargetFile({
      projectPath: targetDirPath,
      filePathObj: {
        path: 'api',
        filename: 'dtos.ts',
      },
      fileContent: responses.api.dtos.map((x) => CodeSnippets.sanitizeTypescript(x)).join('\n'),
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
