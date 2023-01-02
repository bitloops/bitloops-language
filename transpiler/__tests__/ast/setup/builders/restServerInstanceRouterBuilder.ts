import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TRestServerInstanceRouter, TRouterInstanceName } from '../../../../src/types.js';

export class RestServerInstanceRouterBuilder implements IBuilder<TRestServerInstanceRouter> {
  private instanceName: TRouterInstanceName;
  private routerPrefix: string;

  public withInstanceName(instanceName: TRouterInstanceName): RestServerInstanceRouterBuilder {
    this.instanceName = instanceName;
    return this;
  }

  public withRouterPrefix(routerPrefix: string): RestServerInstanceRouterBuilder {
    this.routerPrefix = routerPrefix;
    return this;
  }

  public build(): TRestServerInstanceRouter {
    return {
      instanceName: this.instanceName,
      routerPrefix: this.routerPrefix,
    };
  }
}
