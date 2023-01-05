import { TIdentifier, TRouterDefinition, TRouterController } from '../../../../types.js';

export type TController = {
  instanceName: TIdentifier;
} & TRouterController;
type TModuleName = string;
type TControllerModule = Record<TModuleName, TController[]>;
type TBoundedContextName = string;
export type TControllers = Record<TBoundedContextName, TControllerModule>;

export class RouterDefinitionHelpers {
  static getControllersForEachBoundedContextModule(
    routerDefinitions: TRouterDefinition[],
  ): TControllers {
    const controllers: TControllers = {};
    for (const router of routerDefinitions) {
      const { routerDefinition } = router;
      const { identifier, routerExpression } = routerDefinition;
      const { routerControllers } = routerExpression;
      for (const controller of routerControllers) {
        const { routerController } = controller;
        const { boundedContextModule } = routerController;
        const { boundedContextName, moduleName } = boundedContextModule;
        const { wordsWithSpaces: boundedContext } = boundedContextName;
        const { wordsWithSpaces: module } = moduleName;

        if (!controllers[boundedContext]) {
          controllers[boundedContext] = {
            module: [
              {
                instanceName: identifier, // TODO get from controller
                routerController,
              },
            ],
          };
        } else if (!controllers[boundedContext][module]) {
          controllers[boundedContext][module] = [
            {
              instanceName: identifier,
              routerController,
            },
          ];
        } else {
          controllers[boundedContext][module].push({
            instanceName: identifier,
            routerController,
          });
        }
      }
    }
    return controllers;
  }
}
