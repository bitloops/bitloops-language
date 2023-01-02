import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRESTServerInstance,
  TExpression,
  TRestServerInstanceRouters,
  TServerType,
} from '../../../../src/types.js';

export class RestServerDeclarationBuilder implements IBuilder<TRESTServerInstance> {
  private port: TExpression;
  private apiPrefix?: string;
  private routes: TRestServerInstanceRouters;
  private serverType: TServerType;

  public withPort(port: TExpression): RestServerDeclarationBuilder {
    this.port = port;
    return this;
  }
  public withApiPrefix(apiPrefix: string): RestServerDeclarationBuilder {
    this.apiPrefix = apiPrefix;
    return this;
  }
  public withRoutes(routes: TRestServerInstanceRouters): RestServerDeclarationBuilder {
    this.routes = routes;
    return this;
  }
  public withServerType(serverType: TServerType): RestServerDeclarationBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): TRESTServerInstance {
    const restServerInstance = {
      restServer: {
        serverOptions: [
          {
            port: this.port,
          },
          {
            apiPrefix: this.apiPrefix || '',
          },
          {
            serverType: this.serverType,
          },
        ],
        routers: this.routes,
      },
    };

    return restServerInstance;
  }
}
