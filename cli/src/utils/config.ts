import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

const homeDirectory = homedir();
const configDirectory = join(homeDirectory, '.bitloops');
const configFile = join(configDirectory, '.bitloopsrc');

const bitloopsProjectConfigFileName = 'bitloops.config.json';

export type BitloopsProjectConfig = {
  concretions: {
    [boundedContext: string]: {
      [module: string]: {
        [fileName: string]: 'Mock' | 'Mongo' | 'Postgres';
      };
    };
  };
  grpc: {
    package: string;
    'service-name': string;
    controllers: {
      [boundedContext: string]: {
        [module: string]: {
          entities: string[];
          handlers: {
            [handlerFileName: string]: string; // Query/Command file type
          };
        };
      };
    };
    'stream-events': {
      [boundedContext: string]: {
        [module: string]: string[]; // IntegrationEvents
      };
    };
  };
};

export class ConfigUtils {
  static async readApiKey(): Promise<string | null> {
    try {
      const config = await readFile(configFile, 'utf-8');
      return (JSON.parse(config).api_key as string) ?? null;
    } catch (error) {
      return null;
    }
  }

  static async writeApiKey(apiKey: string): Promise<void> {
    const configDirExists = existsSync(configDirectory);
    if (!configDirExists) {
      await mkdir(configDirectory);
    }
    const config = JSON.stringify({ api_key: apiKey });
    await writeFile(configFile, config, 'utf-8');
  }

  static async readBitloopsProjectConfigFile(): Promise<BitloopsProjectConfig> {
    const cwd = process.cwd();
    const filePath = join(cwd, bitloopsProjectConfigFileName);
    try {
      // Read file
      const config = await readFile(filePath, 'utf-8');
      // Parse file
      return JSON.parse(config);
    } catch (error) {
      return null;
    }
  }
}
