import { FileUtil } from '../../../../../src/utils/file.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { StringLiteralBuilder } from '../../../core/builders/stringLiteral.js';
import { RestServerDeclarationBuilder } from '../../builders/restServerDirector.js';
import { RestServerInstanceRouterBuilder } from '../../builders/restServerInstanceRouterBuilder.js';

const portExpression = new ExpressionBuilderDirector().buildLogicalOrExpression(
  new ExpressionBuilderDirector().buildIdentifierExpression('env.FASTIFY_PORT'),
  new ExpressionBuilderDirector().buildInt32LiteralExpression(3002),
);

export const VALID_REST_SERVER_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/restServer.bl',
    ),
    description: 'Valid rest server',
    fileId: 'testFile.bl',
    restServer: new RestServerDeclarationBuilder()
      .withServerType('REST.Fastify')
      .withApiPrefix('/')
      .withPort(portExpression)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
          .build(),
      ])
      .build(),
  },
];
