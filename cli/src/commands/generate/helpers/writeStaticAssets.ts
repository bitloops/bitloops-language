import { mkdir } from 'fs/promises';

import { ComponentsInfo } from '../interfaces/infra-code-generator.js';
import { writeTargetFile } from '../../../functions/writeTargetFile.js';
import { generateApiModule } from '../static-assets/apiModule.js';
import { generateAppModule } from '../static-assets/appModule.js';
import { generateAuthenticationController } from '../static-assets/authenticationController.js';
import { generateMainConfiguration, generateAuthConfiguration } from '../static-assets/config.js';
import { generateConfigYaml } from '../static-assets/configYaml.js';
import { generateMainFile } from '../static-assets/mainFile.js';

export const writeStaticAssets = async (
  targetDirPath: string,
  componentsInfo: ComponentsInfo,
): Promise<void> => {
  await Promise.all([
    writeApiModuleDefinition(targetDirPath),
    writeApiRestAuthController(targetDirPath),
    writeConfigFiles(targetDirPath),
    writeMainFile(targetDirPath),
    writeAppModule(targetDirPath, componentsInfo),
    writeConfigYaml(targetDirPath),
    createProtoGeneratedFolder(targetDirPath),
  ]);
};

async function writeApiModuleDefinition(targetDirPath: string): Promise<void> {
  const content = await generateApiModule();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: 'api',
      filename: 'api.module.ts',
    },
    fileContent: content,
  });
}

async function writeApiRestAuthController(targetDirPath: string): Promise<void> {
  const content = generateAuthenticationController();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: 'api',
      filename: 'authentication.controller.ts',
    },
    fileContent: content,
  });
}

async function writeConfigFiles(targetDirPath: string): Promise<void> {
  const mainConfigContent = generateMainConfiguration();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: 'config',
      filename: 'configuration.ts',
    },
    fileContent: mainConfigContent,
  });

  const authConfigContent = generateAuthConfiguration();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: 'config',
      filename: 'auth.configuration.ts',
    },
    fileContent: authConfigContent,
  });
}

async function writeMainFile(targetDirPath: string): Promise<void> {
  const mainFileContent = generateMainFile();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: '',
      filename: 'main.ts',
    },
    fileContent: mainFileContent,
  });
}

async function writeAppModule(
  targetDirPath: string,
  componentsInfo: ComponentsInfo,
): Promise<void> {
  const mainConfigContent = generateAppModule(componentsInfo);
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: '',
      filename: 'app.module.ts',
    },
    fileContent: mainConfigContent,
  });
}
async function writeConfigYaml(targetDirPath): Promise<void> {
  const mainConfigContent = generateConfigYaml();
  writeTargetFile({
    projectPath: targetDirPath,
    filePathObj: {
      path: '',
      filename: 'config.yaml',
    },
    fileContent: mainConfigContent,
  });
}
async function createProtoGeneratedFolder(targetDirPath: string): Promise<any> {
  // Create an empty folder at path targetDirPath/proto/generated
  return mkdir(`${targetDirPath}/proto/generated`, { recursive: true });
}
