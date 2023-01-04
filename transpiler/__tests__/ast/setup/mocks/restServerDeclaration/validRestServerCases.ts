import { FileUtil } from '../../../../../src/utils/file.js';
import { ExpressionBuilderDirector } from '../../../core/builders/expressionDirector.js';
import { IntegerLiteralBuilder } from '../../../core/builders/IntegerLiteralBuilder.js';
import { NumericLiteralBuilder } from '../../../core/builders/NumericLiteralBuilder.js';
import { StringLiteralBuilder } from '../../../core/builders/stringLiteral.js';
import { CorsOptionsBuilder } from '../../builders/CorsOptionsBuilder.js';
import { RestServerDeclarationBuilder } from '../../builders/restServerDirector.js';
import { RestServerInstanceRouterBuilder } from '../../builders/restServerInstanceRouterBuilder.js';

const portExpressionWithoutDefault = new ExpressionBuilderDirector().buildLogicalOrExpression(
  new ExpressionBuilderDirector().buildEnvVariableExpression('env.FASTIFY_PORT'),
  new ExpressionBuilderDirector().buildInt32LiteralExpression(3002),
);

const portExpressionWithDefault =
  new ExpressionBuilderDirector().buildEnvVariableExpressionWithDefaultNumericLiteral(
    'FASTIFY_PORT',
    new NumericLiteralBuilder()
      .withInteger(new IntegerLiteralBuilder().withType('int32').withValue('5001').build())
      .build(),
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
      .withApiPrefix(new StringLiteralBuilder().withValue('/').build())
      .withPort(portExpressionWithoutDefault)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/restServerWithDefaultEnv.bl',
    ),
    description: 'Valid rest server with default env variable',
    fileId: 'testFile.bl',
    restServer: new RestServerDeclarationBuilder()
      .withServerType('REST.Fastify')
      .withApiPrefix(new StringLiteralBuilder().withValue('/').build())
      .withPort(portExpressionWithDefault)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/restServerWithoutAPIPrefix.bl',
    ),
    description: 'Valid rest server without api prefix',
    fileId: 'testFile.bl',
    restServer: new RestServerDeclarationBuilder()
      .withServerType('REST.Fastify')
      .withPort(portExpressionWithoutDefault)
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue('/').build())
          .build(),
      ])
      .build(),
  },
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/restServerWithCors.bl',
    ),
    description: 'Valid rest server with cors',
    fileId: 'testFile.bl',
    restServer: new RestServerDeclarationBuilder()
      .withServerType('REST.Fastify')
      .withApiPrefix(new StringLiteralBuilder().withValue('/').build())
      .withPort(portExpressionWithoutDefault)
      .withCorsOptions(
        new CorsOptionsBuilder()
          .withOrigin(new StringLiteralBuilder().withValue('*').build())
          .build(),
      )
      .withRoutes([
        new RestServerInstanceRouterBuilder()
          .withInstanceName('helloWorldRESTRouter')
          .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
          .build(),
      ])
      .build(),
  },
];

export const VALID_MULTIPLE_REST_SERVER_CASES = [
  {
    inputBLString: FileUtil.readFileString(
      'transpiler/__tests__/ast/setup/mocks/restServerDeclaration/multipleRestServers.bl',
    ),
    description: 'Valid multiple rest servers',
    fileId: 'testFile.bl',
    restServers: [
      new RestServerDeclarationBuilder()
        .withServerType('REST.Fastify')
        .withApiPrefix(new StringLiteralBuilder().withValue('/').build())
        .withPort(portExpressionWithoutDefault)
        .withRoutes([
          new RestServerInstanceRouterBuilder()
            .withInstanceName('helloWorldRESTRouter')
            .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
            .build(),
        ])
        .build(),
      new RestServerDeclarationBuilder()
        .withServerType('REST.Express')
        .withApiPrefix(new StringLiteralBuilder().withValue('/').build())
        .withPort(portExpressionWithoutDefault)
        .withRoutes([
          new RestServerInstanceRouterBuilder()
            .withInstanceName('anotherRestRouter')
            .withRouterPrefix(new StringLiteralBuilder().withValue('/').build())
            .build(),
        ])
        .build(),
    ],
  },
];
