import { controllerDefinitionIsGraphQL } from '../../../../helpers/typeGuards.js';
import {
  ControllerTypeOfDefinition,
  ISetupData,
  TGraphQLServerInstance,
} from '../../../../types.js';
import { getControllerInstanceName } from '../../helpers/getControllerInstanceName.js';

export const populateGraphQLAndControllers = (
  result: ISetupData,
  serverOptions: Readonly<TGraphQLServerInstance>,
): TGraphQLServerInstance => {
  const deepCopyServerOptions = JSON.parse(JSON.stringify(serverOptions));
  /**
   * Result.controllers
   */
  const { resolvers } = deepCopyServerOptions;
  if (!result.controllers) result.controllers = {} as any;

  for (const resolver of resolvers) {
    const { boundedContext, module, controllerClassName, dependencies } = resolver;

    if (!result.controllers[boundedContext]) result.controllers[boundedContext] = {};
    if (!result.controllers[boundedContext][module])
      result.controllers[boundedContext][module] = {};

    // Generate controller Instance Name
    const controllerInstance = getControllerInstanceName(
      result,
      boundedContext,
      module,
      controllerClassName,
    );
    // Add 2way reference
    resolver.controllerInstance = controllerInstance;

    if (!result.controllers[boundedContext][module][controllerClassName]) {
      result.controllers[boundedContext][module][controllerClassName] = {
        type: ControllerTypeOfDefinition.GRAPHQL,
        instances: [
          {
            controllerInstance,
            dependencies,
          },
        ],
      };
    } else {
      const controllerDefinition = result.controllers[boundedContext][module][controllerClassName];
      if (!controllerDefinitionIsGraphQL(controllerDefinition)) {
        throw new Error(
          `Controller ${controllerClassName} is not a GraphQL controller, but a ${controllerDefinition.type} controller`,
        );
      }
      const instances = controllerDefinition.instances;
      instances.push({
        controllerInstance,
        dependencies,
      });
    }
  }

  /**
   * Result.Setup.servers.GraphQL
   */
  return deepCopyServerOptions;
};
