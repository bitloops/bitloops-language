import { ControllerTypeOfDefinition, ISetupData, TServerType } from '../../../../types.js';
import { getControllerInstanceName } from '../../helpers/getControllerInstanceName.js';

type Params = {
  controllerClass: string;
  boundedContext: string;
  module: string;
  dependencies: string[];
  method: string;
  path: string;
};

type PopulateRoutesParams = {
  key: string;
  controllerClass: string;
  boundedContext: string;
  module: string;
};

export const populateRoutes = (
  params: PopulateRoutesParams,
  result: ISetupData,
  serverType: string,
  routerIdentifier: string,
) => {
  const { key, controllerClass, boundedContext, module } = params;

  const newMethodURLMap = {
    controllerClass,
    boundedContext,
    module,
  };
  result.routers[serverType][routerIdentifier].methodURLMap[key] = newMethodURLMap;
};
/**
 *  TODO make this function immutable, and return a new object
 * dont mutate result
 */
export const populateControllers = (params: Params, result: ISetupData, serverType: string) => {
  const { controllerClass, boundedContext, module, dependencies, method, path } = params;

  if (!result.controllers[boundedContext]) result.controllers[boundedContext] = {};
  if (!result.controllers[boundedContext][module]) result.controllers[boundedContext][module] = {};
  const controllerInstance = getControllerInstanceName(
    result,
    boundedContext,
    module,
    controllerClass,
  );

  if (!result.controllers[boundedContext][module][controllerClass]) {
    result.controllers[boundedContext][module][controllerClass] = {
      type: ControllerTypeOfDefinition.REST,
      method,
      serverType: serverType as TServerType,
      instances: [
        {
          url: path,
          controllerInstance,
          dependencies,
        },
      ],
    };
  } else {
    const instances = result.controllers[boundedContext][module][controllerClass].instances;
    instances.push({
      url: path,
      controllerInstance,
      dependencies,
    });
  }
};
