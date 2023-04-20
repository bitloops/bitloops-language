import { writeTargetFile } from '../../functions/writeTargetFile.js';
import { TGeneratedInfra } from './invoker.js';

export const writeOutput = async (result: TGeneratedInfra, projectPath: string): Promise<void> => {
  const boundedContextFolder = 'bounded-contexts';
  for (const [boundedContextName, boundedContext] of Object.entries(result.boundedContexts)) {
    for (const [moduleName, module] of Object.entries(boundedContext)) {
      const { moduleDefinition, repositories, services } = module;

      const moduleBasePath = `${boundedContextFolder}/${boundedContextName}/${moduleName}`;

      writeTargetFile({
        projectPath,
        filePathObj: {
          path: moduleBasePath + '/',
          filename: `${moduleName}.module.ts`,
        },
        fileContent: moduleDefinition,
      });
      for (const repository of repositories) {
        const repositoriesPath = moduleBasePath + '/repositories/';
        writeTargetFile({
          projectPath,
          filePathObj: {
            path: repositoriesPath,
            filename: 'repository.ts',
          },
          fileContent: repository,
        });

        for (const service of services) {
          const servicesPath = moduleBasePath + '/services/';
          writeTargetFile({
            projectPath,
            filePathObj: {
              path: servicesPath,
              filename: 'service.ts',
            },
            fileContent: service,
          });
        }
      }
    }
  }
};
