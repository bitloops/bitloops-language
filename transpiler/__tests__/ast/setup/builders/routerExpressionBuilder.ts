import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRouterExpression,
  TRestRouter,
  TRouterArguments,
  TRouterControllers,
} from '../../../../src/types.js';

export class RouterExpressionBuilder implements IBuilder<TRouterExpression> {
  private restRouter: TRestRouter;
  private routerArguments: TRouterArguments;
  private routerControllers: TRouterControllers;

  public withRestRouter(restRouter: TRestRouter): RouterExpressionBuilder {
    this.restRouter = restRouter;
    return this;
  }

  public withRouterArguments(routerArguments: TRouterArguments): RouterExpressionBuilder {
    this.routerArguments = routerArguments;
    return this;
  }

  public withRouterControllers(routerControllers: TRouterControllers): RouterExpressionBuilder {
    this.routerControllers = routerControllers;
    return this;
  }

  public build(): TRouterExpression {
    const routerExpression = {
      routerExpression: {
        restRouter: this.restRouter,
        ...this.routerArguments,
        ...this.routerControllers,
      },
    };

    return routerExpression;
  }
}
