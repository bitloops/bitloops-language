import { TRouterDefinition, TRouterController } from '../../../../types.js';

type TModuleName = string;
type TControllerModule = Record<TModuleName, TRouterController[]>;
type TBoundedContextName = string;
export type TControllers = Record<TBoundedContextName, TControllerModule>;

export class RouterDefinitionHelpers {
  static getControllersForEachBoundedContextModule(
    routerDefinitions: TRouterDefinition[],
  ): TControllers {
    const controllers: TControllers = {};
    for (const router of routerDefinitions) {
      const { routerDefinition } = router;
      const { routerExpression } = routerDefinition;
      const { routerControllers } = routerExpression;
      for (const controller of routerControllers) {
        const { routerController } = controller;
        const { boundedContextModule } = routerController;
        const { boundedContextName, moduleName } = boundedContextModule;
        const { wordsWithSpaces: boundedContext } = boundedContextName;
        const { wordsWithSpaces: module } = moduleName;

        if (!controllers[boundedContext]) {
          controllers[boundedContext] = {
            [module]: [
              {
                routerController,
              },
            ],
          };
        } else if (!controllers[boundedContext][module]) {
          controllers[boundedContext][module] = [
            {
              routerController,
            },
          ];
        } else {
          controllers[boundedContext][module].push({
            routerController,
          });
        }
      }
    }
    return controllers;
  }
}
