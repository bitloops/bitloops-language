import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TEvaluationFields,
  TRESTServerInstance,
  TRestServerInstanceRouters,
} from '../../../../src/types.js';

export class RestServerDeclarationBuilder implements IBuilder<TRESTServerInstance> {
  private fields: TEvaluationFields;
  private routes: TRestServerInstanceRouters;

  public withFieldList(fields: TEvaluationFields): RestServerDeclarationBuilder {
    this.fields = fields;
    return this;
  }

  public withRoutes(routes: TRestServerInstanceRouters): RestServerDeclarationBuilder {
    this.routes = routes;
    return this;
  }

  public build(): TRESTServerInstance {
    const restServerInstance: TRESTServerInstance = {
      restServer: {
        serverOptions: this.fields,
        serverRoutes: this.routes,
      },
    };

    return restServerInstance;
  }
}
