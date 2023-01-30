import { TGraphQLController, TGraphQLOperation } from '../../../../../src/types.js';
import { ArgumentBuilderDirector } from '../argumentDirector.js';
import { ArgumentListBuilderDirector } from '../argumentListBuilderDirector.js';
import { ParameterBuilderDirector } from '../ParameterBuilderDirector.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { StatementDirector } from '../statement/statementDirector.js';
import { GraphQLControllerBuilder } from './graphQLControllerBuilder.js';
import { GraphQLExecuteBuilder } from './graphQLExecuteBuilder.js';

export class GraphQLControllerBuilderDirector {
  private graphQLControllerBuilder: GraphQLControllerBuilder;

  constructor() {
    this.graphQLControllerBuilder = new GraphQLControllerBuilder();
  }

  buildControllerWithInputAndNoParams({
    identifier,
    inputType,
    operationType,
  }: {
    identifier: string;
    inputType: string;
    operationType: TGraphQLOperation;
  }): TGraphQLController {
    const controller = this.graphQLControllerBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withInputType(inputType)
      .withOperationType(operationType)
      .withExecute(
        new GraphQLExecuteBuilder()
          .withReturnType('HelloWorldResponseDTO')
          .withRequestIdentifier('request')
          .withStatements([
            new StatementDirector().buildThisMethodCall(
              'ok',

              new ArgumentListBuilderDirector().buildArgumentListWithArgs([
                new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
              ]),
            ),
          ])
          .build(),
      )
      .build();

    return controller;
  }
  buildControllerWithoutInputAndNoParams({
    identifier,
    operationType,
  }: {
    identifier: string;
    operationType: TGraphQLOperation;
  }): TGraphQLController {
    const controller = this.graphQLControllerBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withInputType(null)
      .withOperationType(operationType)
      .withExecute(
        new GraphQLExecuteBuilder()
          .withReturnType('HelloWorldResponseDTO')
          .withRequestIdentifier('request')
          .withStatements([
            new StatementDirector().buildThisMethodCall(
              'ok',
              new ArgumentListBuilderDirector().buildArgumentListWithArgs([
                new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
              ]),
            ),
          ])
          .build(),
      )
      .build();

    return controller;
  }

  buildControllerWithInputAndOneParam({
    identifier,
    inputType,
    operationType,
    param,
  }: {
    identifier: string;
    inputType: string;
    operationType: TGraphQLOperation;
    param: {
      identifier: string;
      type: string;
    };
  }): TGraphQLController {
    const controller = this.graphQLControllerBuilder
      .withIdentifier(identifier)
      .withParameterList(
        new ParameterListBuilderDirector().buildParams([
          new ParameterBuilderDirector().buildIdentifierParameter(param.identifier, param.type),
        ]),
      )
      .withInputType(inputType)
      .withOperationType(operationType)
      .withExecute(
        new GraphQLExecuteBuilder()
          .withReturnType('HelloWorldResponseDTO')
          .withRequestIdentifier('request')
          .withStatements([
            new StatementDirector().buildThisMethodCall(
              'ok',
              new ArgumentListBuilderDirector().buildArgumentListWithArgs([
                new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
              ]),
            ),
          ])
          .build(),
      )
      .build();

    return controller;
  }
}
