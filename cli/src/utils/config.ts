import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';

const homeDirectory = homedir();
const configDirectory = join(homeDirectory, '.bitloops');
const configFile = join(configDirectory, '.bitloopsrc');

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
}
