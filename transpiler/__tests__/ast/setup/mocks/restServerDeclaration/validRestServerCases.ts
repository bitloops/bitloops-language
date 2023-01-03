import { FileUtil } from '../../../../../src/utils/file.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { StringLiteralBuilder } from '../../../core/builders/stringLiteral.js';
import { RestServerDeclarationBuilder } from '../../builders/restServerDirector.js';
import { RestServerInstanceRouterBuilder } from '../../builders/restServerInstanceRouterBuilder.js';

const portExpressionWithoutDefault = new ExpressionBuilderDirector().buildLogicalOrExpression(
  new ExpressionBuilderDirector().buildEnvVariableExpression('env.FASTIFY_PORT'),
  new ExpressionBuilderDirector().buildInt32LiteralExpression(3002),
);

const portExpressionWithDefault =
  new ExpressionBuilderDirector().buildEnvVariableExpressionWithDefault(
    'FASTIFY_PORT',
    // new LiteralExpressionBuilder().withType('int32').withValue('5001').build(),
    new ExpressionBuilderDirector().buildInt32LiteralExpression(5001),
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
      .withApiPrefix(new StringLiteralBuilder().withValue("'/'").build())
      .withPort(portExpressionWithoutDefault)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue("'/hello'").build())
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/reseServerWithDefaultEnv.bl',
    ),
    description: 'Valid rest server with default env variable',
    fileId: 'testFile.bl',
    restServer: new RestServerDeclarationBuilder()
      .withServerType('REST.Fastify')
      .withApiPrefix(new StringLiteralBuilder().withValue("'/'").build())
      .withPort(portExpressionWithDefault)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue("'/hello'").build())
          .build(),
      ])
      .build(),
  },
];
