import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TControllerResolver,
  TBoundedContextModule,
  TArgumentList,
  TControllerInstanceName,
  GraphQLControllerIdentifier,
  ControllerResolverKey,
} from '../../../../src/types.js';
import { BoundedContextModuleBuilderDirector } from './boundedContextModuleBuilderDirector.js';

export class GraphQLControllerResolverBuilder implements IBuilder<TControllerResolver> {
  private instanceName: TControllerInstanceName;
  private bcModule: TBoundedContextModule;
  private className: GraphQLControllerIdentifier;
  private arguments: TArgumentList;

  public withInstanceName(instanceName: TControllerInstanceName): GraphQLControllerResolverBuilder {
    this.instanceName = instanceName;
    return this;
  }

  public withClassName(className: GraphQLControllerIdentifier): GraphQLControllerResolverBuilder {
    this.className = className;
    return this;
  }

  withBoundedContextModule({
    boundedContextName,
    moduleName,
  }: {
    boundedContextName: string;
    moduleName: string;
  }): GraphQLControllerResolverBuilder {
    this.bcModule = new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
      boundedContextName,
      moduleName,
    });
    return this;
  }

  withArguments(args: TArgumentList): GraphQLControllerResolverBuilder {
    this.arguments = args;
    return this;
  }

  public build(): TControllerResolver {
    const controllerResolver: TControllerResolver = {
      [ControllerResolverKey]: {
        GraphQLControllerIdentifier: this.className,
        controllerInstanceName: this.instanceName,
        ...this.arguments,
        ...this.bcModule,
      },
    };
    return controllerResolver;
  }
}
