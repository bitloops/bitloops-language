import { TBoundedContextName, TModuleName } from '../../types.js';
import { Command } from './commands/command.js';

export const GENERATED_INFRA_KEYS = {
  API_GRPC_CONTROLLER: 'api.grpcControllers',
  API_PROTO_BUFF: 'api.protobuff',
  API_DTO: 'api.dtos',
  MODULE_DEFINITION: (boundedContextName: TBoundedContextName, moduleName: TModuleName): string =>
    `boundedContexts.${boundedContextName}.${moduleName}.moduleDefinition`,
  REPOSITORIES: (boundedContextName: TBoundedContextName, moduleName: TModuleName): string =>
    `boundedContexts.${boundedContextName}.${moduleName}.repositories`,
  SERVICES: (boundedContextName: TBoundedContextName, moduleName: TModuleName): string =>
    `boundedContexts.${boundedContextName}.${moduleName}.services`,
};

type TGeneratedComponent = string;
export type TGeneratedInfra = Partial<{
  api: {
    grpcControllers: TGeneratedComponent[];
    protobuff: TGeneratedComponent;
    dtos: TGeneratedComponent;
  };
  boundedContexts: {
    [key: TBoundedContextName]: {
      [key: TModuleName]: {
        moduleDefinition: TGeneratedComponent;
        repositories: TGeneratedComponent[];
        services: TGeneratedComponent[];
      };
    };
  };
}>;

/**
 * Invoker: This is a class that knows how to execute commands, but does not know the specifics of the commands.
 * It simply invokes the execute method on the commands when it needs to.
 * In the example code, the Invoker class manages the commands and executes them one by one.
 */
export class Invoker {
  private commands: Array<{ key: string; command: Command }> = [];
  private results: TGeneratedInfra = {};

  addCommand(key: string, command: Command, isArray = false): void {
    this.commands.push({ key, command });

    if (isArray) {
      this.setNestedProperty(this.results, key, []);
      return;
    }
    this.setNestedProperty(this.results, key, null);
  }

  async executeCommands(): Promise<TGeneratedInfra> {
    await Promise.all(
      this.commands.map(async ({ key, command }) => {
        const [result, error] = await command.execute();

        if (error) {
          console.error(error);
          throw error;
        }

        this.setNestedProperty(this.results, key, result);
      }),
    );
    return this.results;
  }

  getTotalTokens(): number {
    return this.commands.reduce((total, { command }) => total + command.usedTokens, 0);
  }

  /**
   * Returns total cost of all commands in USD
   */
  getTotalCost(): number {
    return this.commands.reduce((total, { command }) => total + command.totalCost, 0);
  }

  private setNestedProperty(obj: any, keyString: string, value: any): void {
    const keys = keyString.split('.');
    let currentObj = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!Object.prototype.hasOwnProperty.call(currentObj, key)) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(currentObj[lastKey]) && !Array.isArray(value)) {
      currentObj[lastKey].push(value);
    } else if (!Array.isArray(currentObj[lastKey])) {
      currentObj[lastKey] = value;
    }
  }
}
