import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TRouterArguments, TServerType } from '../../../../src/types.js';

export class RouterArgumentsBuilder implements IBuilder<TRouterArguments> {
  private serverType: TServerType;

  public withServerType(serverType: TServerType): RouterArgumentsBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): TRouterArguments {
    const routerArguments = {
      routerArguments: {
        serverType: this.serverType,
      },
    };

    return routerArguments;
  }
}
