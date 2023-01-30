import { FileUtil } from '../../../../../src/utils/file.js';
import { ArgumentListBuilderDirector } from '../../../core/builders/argumentListBuilderDirector.js';
import { StringLiteralBuilder } from '../../../core/builders/stringLiteral.js';
import { BoundedContextModuleBuilderDirector } from '../../builders/boundedContextModuleBuilderDirector.js';
import { RouterControllerBuilder } from '../../builders/routerControllerBuilder.js';
import { RouterDefinitionBuilderDirector } from '../../builders/routerDefinitionBuilderDirector.js';

export const VALID_ROUTER_DEFINITION_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/routerDefinition/routerWithoutDependency.bl',
    ),
    description: 'Fastify router definition with no useCase dependencies',
    fileId: 'setup.bl',
    routerDefinition:
      new RouterDefinitionBuilderDirector().buildFastifyRouterDefinitionWithNoDependencies({
        constIdentifier: 'helloWorldRESTRouter',
        controllerIdentifier: 'HelloWorldController',
        controllerIntanceName: 'helloWorldController1',
        boundedContextName: 'Bounded Context',
        moduleName: 'Module',
        method: 'Get',
        path: '/hello1',
      }),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/routerDefinition/routerDefinitionWithMultipleControllers.bl',
    ),
    description: 'Express router definition with multiple controllers',
    fileId: 'setup.bl',
    routerDefinition:
      new RouterDefinitionBuilderDirector().buildExpressRouterDefinitionWithMultipleControllers({
        constIdentifier: 'helloWorldRESTRouter',
        controllers: [
          new RouterControllerBuilder()
            .withArguments(new ArgumentListBuilderDirector().buildEmptyArgumentList())
            .withBoundedContextModule(
              new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
                boundedContextName: 'Bounded Context',
                moduleName: 'Module',
              }),
            )
            .withControllerIdentifier('HelloWorldController')
            .withControllerInstanceName('helloWorldController1')
            .withMethod('Get')
            .withPath(new StringLiteralBuilder().withValue('/hello1').build())
            .build(),
          new RouterControllerBuilder()
            .withArguments(new ArgumentListBuilderDirector().buildArgumentList(['myUseCase']))
            .withBoundedContextModule(
              new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
                boundedContextName: 'Hello World',
                moduleName: 'My Module2',
              }),
            )
            .withControllerIdentifier('HelloWorldController')
            .withControllerInstanceName('helloWorldController2')
            .withMethod('Post')
            .withPath(new StringLiteralBuilder().withValue('/hello2').build())
            .build(),
        ],
      }),
  },
];
