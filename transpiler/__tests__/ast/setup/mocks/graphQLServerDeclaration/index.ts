import { FileUtil } from '../../../../../src/utils/file.js';
import { EvaluationFieldBuilderDirector } from '../../../core/builders/evaluationFieldDirector.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';

import { GraphQLControllerResolverBuilder } from '../../builders/graphQLServerControllerResolverBuilder.js';
import { GraphQLServerDeclarationBuilder } from '../../builders/graphQLServerDeclarationBuilder.js';

export const VALID_GRAPHQL_SERVER_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/graphqlServerDeclaration/graphQLServerWithSingleController.bl',
    ),
    description: 'Valid graphQL server',
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
          .withInstanceName('HelloWorldController')
          .withClassName('HelloWorldController')
          .withBoundedContextModule({ boundedContextName: 'Demo', moduleName: 'Hello World' })
          .withArguments({ argumentList: [] })
          .build(),
      ])
      .build(),
  },
];
