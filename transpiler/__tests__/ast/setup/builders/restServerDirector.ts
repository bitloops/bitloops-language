import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRESTServerInstance,
  TExpression,
  TRestServerInstanceRouters,
  TServerType,
  TAPIPrefix,
  StringLiteral,
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
    // if (!this.apiPrefix) {
    //   const restServerInstance = {
    //     restServer: {
    //       serverOptions: [
    //         {
    //           serverType: this.serverType,
    //         },
    //         {
    //           apiPrefix: null,
    //         },
    //         {
    //           restServerPort: this.port,
    //         },
    //       ],
    //       serverRoutes: this.routes,
    //     },
    //   };

    //   return restServerInstance;
    // } else {
    const restServerInstance: TRESTServerInstance = {
      restServer: {
        serverOptions: [
          {
            serverType: this.serverType,
          },
          {
            apiPrefix: this.apiPrefix,
          },
          {
            restServerPort: this.port,
          },
        ],
        serverRoutes: this.routes,
      },
    };

    // if (this.apiPrefix) {
    //   restServerInstance.restServer.serverOptions[0] = {
    //     apiPrefix: this.apiPrefix,
    //     ...restServerInstance.restServer.serverOptions[0],
    //   };
    // }

    return restServerInstance;
    // }
  }
}
