import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TEvaluationFields,
  TGraphQLServerInstance,
  TControllerResolvers,
  GraphQLServerInstanceKey,
  ControllerResolversKey,
  GraphQLServerOptionsKey,
} from '../../../../src/types.js';

export class GraphQLServerDeclarationBuilder implements IBuilder<TGraphQLServerInstance> {
  private options: TEvaluationFields;
  private resolvers: TControllerResolvers;

  public withOptions(fields: TEvaluationFields): GraphQLServerDeclarationBuilder {
    this.options = fields;
    return this;
  }

  public withResolvers(resolvers: TControllerResolvers): GraphQLServerDeclarationBuilder {
    this.resolvers = resolvers;
    return this;
  }

  public build(): TGraphQLServerInstance {
    const graphQLServerInstance: TGraphQLServerInstance = {
      [GraphQLServerInstanceKey]: {
        [GraphQLServerOptionsKey]: this.options,
        [ControllerResolversKey]: this.resolvers,
      },
    };

    return graphQLServerInstance;
  }
}
