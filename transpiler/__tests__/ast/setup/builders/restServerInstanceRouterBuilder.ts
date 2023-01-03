import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  StringLiteral,
  TRestServerInstanceRouter,
  TRouterInstanceName,
} from '../../../../src/types.js';

export class RestServerInstanceRouterBuilder implements IBuilder<TRestServerInstanceRouter> {
  private instanceName: TRouterInstanceName;
  private routerPrefix: StringLiteral;

  public withInstanceName(instanceName: TRouterInstanceName): RestServerInstanceRouterBuilder {
    this.instanceName = instanceName;
    return this;
  }

  public withRouterPrefix(routerPrefix: StringLiteral): RestServerInstanceRouterBuilder {
    this.routerPrefix = routerPrefix;
    return this;
  }

  public build(): TRestServerInstanceRouter {
    return {
      serverRoute: {
        identifier: this.instanceName,
        routerPrefix: this.routerPrefix,
      },
    };
  }
}
