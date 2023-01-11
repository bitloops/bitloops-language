import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../../core/builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { BoundedContextModuleBuilderDirector } from '../../builders/boundedContextModuleBuilderDirector.js';

import { GraphQLControllerResolverBuilder } from '../../builders/graphQLServerControllerResolverBuilder.js';
import { GraphQLServerDeclarationBuilder } from '../../builders/graphQLServerDeclarationBuilder.js';

export const VALID_GRAPHQL_SERVER_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/graphQLServerDeclaration/graphQLServerWithSingleController.bl',
    ),
    description: 'Valid GraphQL server with single controller',
    fileId: 'testFile.bl',
    graphQLServer: new GraphQLServerDeclarationBuilder()
      .withOptions({
        fields: [
          new EvaluationFieldBuilderDirector().buildEvaluationField(
            'port',
            new ExpressionBuilderDirector().buildLogicalOrExpression(
              new ExpressionBuilderDirector().buildEnvVariableExpression('env.APOLLO_SERVER'),
              new ExpressionBuilderDirector().buildInt32LiteralExpression(5001),
            ),
          ),
        ],
      })
      .withResolvers([
        new GraphQLControllerResolverBuilder()
          .withInstanceName('helloWorldController1')
          .withClassName('HelloWorldController')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'Demo',
              moduleName: 'Hello World',
            }),
          )
          .withArguments({ argumentList: [] })
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/graphQLServerDeclaration/graphQLServerWithMultipleControllers.bl',
    ),
    description: 'Valid GraphQL server with multiple controllers',
    fileId: 'testFile.bl',
    graphQLServer: new GraphQLServerDeclarationBuilder()
      .withOptions({
        fields: [
          new EvaluationFieldBuilderDirector().buildEvaluationField(
            'port',
            new ExpressionBuilderDirector().buildLogicalOrExpression(
              new ExpressionBuilderDirector().buildEnvVariableExpression('env.APOLLO_SERVER'),
              new ExpressionBuilderDirector().buildInt32LiteralExpression(5001),
            ),
          ),
        ],
      })
      .withResolvers([
        new GraphQLControllerResolverBuilder()
          .withInstanceName('helloWorldController1')
          .withClassName('HelloWorldController')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'Demo',
              moduleName: 'Hello World',
            }),
          )
          .withArguments({ argumentList: [] })
          .build(),
        new GraphQLControllerResolverBuilder()
          .withInstanceName('helloWorld2Controller1')
          .withClassName('HelloWorld2Controller')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'Demo',
              moduleName: 'Bye World',
            }),
          )
          .withArguments({ argumentList: [] })
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/graphQLServerDeclaration/graphQLServerWithDependencies.bl',
    ),
    description: 'Valid GraphQL server with dependencies',
    fileId: 'testFile.bl',
    graphQLServer: new GraphQLServerDeclarationBuilder()
      .withOptions({
        fields: [
          new EvaluationFieldBuilderDirector().buildEvaluationField(
            'port',
            new ExpressionBuilderDirector().buildLogicalOrExpression(
              new ExpressionBuilderDirector().buildEnvVariableExpression('env.APOLLO_SERVER'),
              new ExpressionBuilderDirector().buildInt32LiteralExpression(5001),
            ),
          ),
        ],
      })
      .withResolvers([
        new GraphQLControllerResolverBuilder()
          .withInstanceName('helloWorldController1')
          .withClassName('HelloWorldController')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'Demo',
              moduleName: 'Hello World',
            }),
          )
          .withArguments({
            argumentList: [
              {
                argument: new ExpressionBuilderDirector().buildIdentifierExpression(
                  'useCase1Dependency',
                ),
              },
            ],
          })
          .build(),
        new GraphQLControllerResolverBuilder()
          .withInstanceName('helloWorld2Controller1')
          .withClassName('HelloWorld2Controller')
          .withBoundedContextModule(
            new BoundedContextModuleBuilderDirector().buildBoundedContextModule({
              boundedContextName: 'Demo',
              moduleName: 'Bye World',
            }),
          )
          .withArguments({
            argumentList: [
              {
                argument: new ExpressionBuilderDirector().buildIdentifierExpression(
                  'useCase2Dependency',
                ),
              },
              {
                argument: new ExpressionBuilderDirector().buildIdentifierExpression('usersRepo'),
              },
            ],
          })
          .build(),
      ])
      .build(),
  },
];
