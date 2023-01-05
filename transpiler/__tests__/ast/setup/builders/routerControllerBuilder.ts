import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TRouterController,
  THTTPMethodVerb,
  StringLiteral,
  TBoundedContextModule,
  TRESTControllerIdentifier,
  TArgumentList,
  TControllerInstanceName,
} from '../../../../src/types.js';

export class RouterControllerBuilder implements IBuilder<TRouterController> {
  private method: THTTPMethodVerb;
  private path: StringLiteral;
  private bcModule: TBoundedContextModule;
  private restControllerIdentifier: TRESTControllerIdentifier;
  private argumentList: TArgumentList;
  private controllerInstanceName: TControllerInstanceName;

  public withMethod(method: THTTPMethodVerb): RouterControllerBuilder {
    this.method = method;
    return this;
  }

  public withPath(path: StringLiteral): RouterControllerBuilder {
    this.path = path;
    return this;
  }

  public withBoundedContextModule(bcModule: TBoundedContextModule): RouterControllerBuilder {
    this.bcModule = bcModule;
    return this;
  }

  public withControllerIdentifier(
    restControllerIdentifier: TRESTControllerIdentifier,
  ): RouterControllerBuilder {
    this.restControllerIdentifier = restControllerIdentifier;
    return this;
  }

  public withArguments(argumentList: TArgumentList): RouterControllerBuilder {
    this.argumentList = argumentList;
    return this;
  }

  public withControllerInstanceName(
    controllerInstanceName: TControllerInstanceName,
  ): RouterControllerBuilder {
    this.controllerInstanceName = controllerInstanceName;
    return this;
  }

  public build(): TRouterController {
    const routerController = {
      routerController: {
        httpMethodVerb: this.method,
        RESTControllerIdentifier: this.restControllerIdentifier,
        controllerInstanceName: this.controllerInstanceName,
        ...this.path,
        ...this.bcModule,
        ...this.argumentList,
      },
    };

    return routerController;
  }
}
