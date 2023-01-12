import {
  TRouterDefinition,
  TRouterController,
  TControllerResolver,
  TGraphQLServerInstance,
  GraphQLServerInstanceKey,
  ControllerResolversKey,
} from '../../../../types.js';

type TModuleName = string;
type TBoundedContextName = string;
type TRESTControllerModule = Record<TModuleName, TRouterController[]>;
type TGraphQLControllerModule = Record<TModuleName, TControllerResolver[]>;

export type TRESTControllers = Record<TBoundedContextName, TRESTControllerModule>;
export type TGraphQLControllers = Record<TBoundedContextName, TGraphQLControllerModule>;

export class ControllerHelpers {
  static getRESTControllersForEachBoundedContextModule(
    routerDefinitions: TRouterDefinition[],
  ): TRESTControllers {
    const controllers: TRESTControllers = {};
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

  static getGraphQLControllersForEachBoundedContextModule(
    graphQLServerInstances: TGraphQLServerInstance[],
  ): TGraphQLControllers {
    const controllers: TGraphQLControllers = {};
    for (const serverInstance of graphQLServerInstances) {
      const controllerResolvers = serverInstance[GraphQLServerInstanceKey][ControllerResolversKey];

      for (const resolver of controllerResolvers) {
        const { controllerResolver } = resolver;
        const { boundedContextModule } = controllerResolver;
        const { boundedContextName, moduleName } = boundedContextModule;
        const { wordsWithSpaces: boundedContext } = boundedContextName;
        const { wordsWithSpaces: module } = moduleName;

        if (!controllers[boundedContext]) {
          controllers[boundedContext] = {
            [module]: [
              {
                controllerResolver,
              },
            ],
          };
        } else if (!controllers[boundedContext][module]) {
          controllers[boundedContext][module] = [
            {
              controllerResolver,
            },
          ];
        } else {
          controllers[boundedContext][module].push({
            controllerResolver,
          });
        }
      }
    }
    return controllers;
  }
}
