import { TranspiledTypescriptFileInfo } from '../../../functions/readFilesContents.js';
import { BoundedContextModulesInfo } from '../../../utils/bounded-context-module.generator.js';
import { TGeneratedInfra } from '../invoker.js';

export type ComponentsInfo = BoundedContextModulesInfo<{
  commandHandlers: TranspiledTypescriptFileInfo[];
  queryHandlers: TranspiledTypescriptFileInfo[];
  commands: TranspiledTypescriptFileInfo[];
  queries: TranspiledTypescriptFileInfo[];
  entities: TranspiledTypescriptFileInfo[];
  writeRepoPorts: TranspiledTypescriptFileInfo[];
  readRepoPorts: TranspiledTypescriptFileInfo[];
  servicePorts: TranspiledTypescriptFileInfo[];
  constantsFile: TranspiledTypescriptFileInfo;
  integrationEvents: TranspiledTypescriptFileInfo[];
}>;

export type ExposedGrpcComponents = {
  handlersContent: string[];
  commands: {
    content: string;
    boundedContextName: string;
    moduleName: string;
    // needed so we can get the response type
    commandHandlerContent: string;
  }[];
  queries: {
    content: string;
    boundedContextName: string;
    moduleName: string;
    // needed so we can get the response type
    queryHandlerContent: string;
  }[];
  entitiesContent: string[];
  integrationEvents: TranspiledTypescriptFileInfo[];
};
export interface IInfraCodeGenerator {
  generate(params: {
    componentsInfo: ComponentsInfo;
    exposedGrpcComponents: ExposedGrpcComponents;
  }): Promise<TGeneratedInfra>;

  totalCost: number;
}
