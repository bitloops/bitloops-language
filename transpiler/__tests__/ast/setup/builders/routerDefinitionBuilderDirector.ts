import {
  THTTPMethodVerb,
  TIdentifier,
  TRESTControllerIdentifier,
  TRouterController,
  TRouterDefinition,
} from '../../../../src/types.js';
import { ArgumentListBuilderDirector } from '../../core/builders/argumentListBuilderDirector.js';
import { StringLiteralBuilder } from '../../core/builders/stringLiteral.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';
import { RouterArgumentsBuilder } from './routerArgumentsBuilder.js';
import { RouterControllerBuilder } from './routerControllerBuilder.js';
import { RouterControllersBuilder } from './routerControllersBuilder.js';
import { RouterDefinitionBuilder } from './routerDefinitionBuilder.js';
import { RouterExpressionBuilder } from './routerExpressionBuilder.js';

export class RouterDefinitionBuilderDirector {
  private builder: RouterDefinitionBuilder;

  constructor() {
    this.builder = new RouterDefinitionBuilder();
  }

  buildFastifyRouterDefinitionWithNoDependencies({
    constIdentifier,
    controllerIdentifier,
    boundedContextName,
    moduleName,
    method,
    path,
  }: {
    constIdentifier: TIdentifier;
    controllerIdentifier: TRESTControllerIdentifier;
    boundedContextName: string;
    moduleName: string;
    method: THTTPMethodVerb;
    path: string;
  }): TRouterDefinition {
    const argumentList = new ArgumentListBuilderDirector().buildEmptyArgumentList();
    const bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    const pathStringLiteral = new StringLiteralBuilder().withValue(path).build();

    const routerArguments = new RouterArgumentsBuilder().withServerType('REST.Fastify').build();
    const routerControllers = new RouterControllersBuilder()
      .withControllers([
        new RouterControllerBuilder()
          .withArguments(argumentList)
          .withBoundedContextModule(bcModule)
          .withControllerIdentifier(controllerIdentifier)
          .withControllerInstanceName(controllerIdentifier)
          .withMethod(method)
          .withPath(pathStringLiteral)
          .build(),
      ])
      .build();
    const routerExpression = new RouterExpressionBuilder()
      .withRestRouter('RESTRouter')
      .withRouterArguments(routerArguments)
      .withRouterControllers(routerControllers)
      .build();
    return this.builder.withIdentifier(constIdentifier).withExpression(routerExpression).build();
  }

  buildExpressRouterDefinitionWithMultipleControllers({
    constIdentifier,
    controllers,
  }: {
    constIdentifier: TIdentifier;
    controllers: TRouterController[];
  }): TRouterDefinition {
    const routerArguments = new RouterArgumentsBuilder().withServerType('REST.Express').build();
    const routerControllers = new RouterControllersBuilder().withControllers(controllers).build();
    const routerExpression = new RouterExpressionBuilder()
      .withRestRouter('RESTRouter')
      .withRouterArguments(routerArguments)
      .withRouterControllers(routerControllers)
      .build();
    return this.builder.withIdentifier(constIdentifier).withExpression(routerExpression).build();
  }
}
