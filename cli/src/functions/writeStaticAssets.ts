import { generateApiModule } from '../commands/generate/static-assets/apiModule.js';
import { generateAuthenticationController } from '../commands/generate/static-assets/authenticationController.js';
import { mkdir } from 'fs/promises';
import {
  generateAuthConfiguration,
  generateMainConfiguration,
} from '../commands/generate/static-assets/config.js';
import { writeTargetFile } from './writeTargetFile.js';
import { generateMainFile } from '../commands/generate/static-assets/mainFile.js';
import { generateAppModule } from '../commands/generate/static-assets/appModule.js';
import { generateConfigYaml } from '../commands/generate/static-assets/configYaml.js';

export const writeStaticAssets = async (targetDirPath: string): Promise<void> => {
  await Promise.all([
    writeApiModuleDefinition(targetDirPath),
    writeApiRestAuthController(targetDirPath),
    writeConfigFiles(targetDirPath),
    writeMainFile(targetDirPath),
    writeAppModule(targetDirPath),
    writeConfigYaml(targetDirPath),
    createProtoGeneratedFolder(targetDirPath),
  ]);
};

async function writeApiModuleDefinition(targetDirPath: string): Promise<void> {
  const content = generateApiModule();
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

async function writeAppModule(targetDirPath): Promise<void> {
  const mainConfigContent = generateAppModule();
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
