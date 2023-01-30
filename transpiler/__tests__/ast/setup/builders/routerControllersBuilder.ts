import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TRouterControllers, TRouterController } from '../../../../src/types.js';

export class RouterControllersBuilder implements IBuilder<TRouterControllers> {
  private controllers: TRouterController[];

  public withControllers(controllers: TRouterController[]): RouterControllersBuilder {
    this.controllers = controllers;
    return this;
  }

  public build(): TRouterControllers {
    const routerExpression = {
      routerControllers: this.controllers,
    };

    return routerExpression;
  }
}
