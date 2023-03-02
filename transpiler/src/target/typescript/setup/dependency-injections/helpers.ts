import {
  TDependencyInjections as TDependencyInjectionDefinitions,
  dependencyInjectionKey,
} from '../../../../types.js';
import { TDependencyInjections } from '../definitions.js';

export class DependencyInjectionHelpers {
  static getDependencyInjectionsForEachModule(
    dependencyInjections: TDependencyInjectionDefinitions[],
  ): TDependencyInjections {
    const result: TDependencyInjections = {};
    for (const dependencyInjectionDefinition of dependencyInjections) {
      for (const di of dependencyInjectionDefinition[dependencyInjectionKey]) {
        const { dependencyInjection } = di;
        const { boundedContextModule } = dependencyInjection;
        const { boundedContextName, moduleName } = boundedContextModule;
        const { wordsWithSpaces: boundedContext } = boundedContextName;
        const { wordsWithSpaces: module } = moduleName;

        if (!result[boundedContext]) {
          result[boundedContext] = {
            [module]: [di],
          };
        } else if (!result[boundedContext][module]) {
          result[boundedContext][module] = [di];
        } else {
          result[boundedContext][module].push(di);
        }
      }
    }
    return result;
  }
}
