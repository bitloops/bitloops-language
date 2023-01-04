import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRESTServerInstance,
  TExpression,
  TRestServerInstanceRouters,
  TServerType,
  TAPIPrefix,
  StringLiteral,
  TRestServerOptions,
} from '../../../../src/types.js';

export class RestServerDeclarationBuilder implements IBuilder<TRESTServerInstance> {
  private port: TExpression;
  private apiPrefix?: StringLiteral;
  private routes: TRestServerInstanceRouters;
  private serverType: TServerType;

  public withPort(port: TExpression): RestServerDeclarationBuilder {
    this.port = port;
    return this;
  }
  public withApiPrefix(apiPrefix: TAPIPrefix): RestServerDeclarationBuilder {
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
    const serverOptions: TRestServerOptions = {
      serverType: this.serverType,
      restServerPort: this.port,
    };
    if (this.apiPrefix) {
      serverOptions.apiPrefix = this.apiPrefix;
    }

    const restServerInstance: TRESTServerInstance = {
      restServer: {
        serverOptions,
        serverRoutes: this.routes,
      },
    };

    return restServerInstance;
  }
}
