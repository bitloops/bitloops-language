import { generateApiModule } from '../commands/generate/static-assets/apiModule.js';
import { generateAuthenticationController } from '../commands/generate/static-assets/authenticationController.js';
import { mkdir } from 'fs/promises';
import {
  generateAuthConfiguration,
  generateMainConfiguration,
} from '../commands/generate/static-assets/config.js';
import { writeTargetFile } from './writeTargetFile.js';

export const writeStaticAssets = async (targetDirPath: string): Promise<void> => {
  await Promise.all([
    writeApiModuleDefinition(targetDirPath),
    writeApiRestAuthController(targetDirPath),
    writeConfigFiles(targetDirPath),
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
async function createProtoGeneratedFolder(targetDirPath: string): Promise<any> {
  // Create an empty folder at path targetDirPath/proto/generated
  return mkdir(`${targetDirPath}/proto/generated`, { recursive: true });
}
