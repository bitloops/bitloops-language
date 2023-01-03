import { FileUtil } from '../../../../../src/utils/file.js';
import { RouterDefinitionBuilderDirector } from '../../builders/routerDefinitionBuilderDirector.js';

export const VALID_ROUTER_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/routerDefinition/routerWithoutDependency.bl',
    ),
    description: 'Router without dependency',
    fileId: 'setup.bl',
    routerDefinition:
      new RouterDefinitionBuilderDirector().buildFastifyRouterDefinitionWithNoDependencies({
        constIdentifier: 'helloWorldRESTRouter',
        controllerIdentifier: 'HelloWorldController',
        boundedContextName: 'Bounded Context',
        moduleName: 'Module',
        method: 'Get',
        path: '/hello1',
      }),
  },
];
