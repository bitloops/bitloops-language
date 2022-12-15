import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TParameterList,
  TRESTController,
  TRESTControllerExecute,
  TRestMethods,
} from '../../../../../src/types.js';

export class RestControllerBuilder implements IBuilder<TRESTController> {
  private parameters: TParameterList;
  private RESTControllerIdentifier: string;
  private method: TRestMethods;
  private execute: TRESTControllerExecute;

  public withIdentifier(identifierName: string): RestControllerBuilder {
    this.RESTControllerIdentifier = identifierName;
    return this;
  }

  public withParameters(params: TParameterList): RestControllerBuilder {
    this.parameters = params;
    return this;
  }

  public withMethod(method: TRestMethods): RestControllerBuilder {
    this.method = method;
    return this;
  }

  public withExecute(execute: TRESTControllerExecute): RestControllerBuilder {
    this.execute = execute;
    return this;
  }

  public build(): TRESTController {
    const restController: TRESTController = {
      RESTController: {
        RESTControllerIdentifier: this.RESTControllerIdentifier,
        ...this.parameters,
        method: this.method,
        execute: this.execute,
      },
    };

    return restController;
  }
}
