import { IdentifierExpressionBuilder } from '../../../../src/ast/core/intermediate-ast/builders/expressions/IdentifierExpressionBuilder.js';
import { StringLiteralBuilder } from '../../../../src/ast/core/intermediate-ast/builders/expressions/literal/StringLiteralBuilder.js';
import { LogicalExpressionBuilder } from '../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalExpressionBuilder.js';
import { LogicalOrExpressionBuilder } from '../../../../src/ast/core/intermediate-ast/builders/expressions/Logical/logicalOrExpressionBuilder.js';
import { IdentifierNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { RestServerNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/setup/RestServerNodeBuilder.js';
import { ServerRouteNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/setup/ServerRouteNodeBuilder.js';
import { ServerRoutesNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/setup/ServerRoutesNodeBuilder.js';
import { ServerTypeIdentifierNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/setup/ServerTypeIdentifierNodeBuilder.js';
import { SetupExpressionNodeBuilder } from '../../../../src/ast/core/intermediate-ast/builders/setup/SetupExpressionNodeBuilder.js';
import { IntermediateASTTree } from '../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { IntermediateASTRootNode } from '../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';
import { RestServerNode } from '../../../../src/ast/core/intermediate-ast/nodes/setup/RestServerNode.js';
import { ExpressionBuilderDirector } from '../../../target/typescript/core/builders/expression.js';

export class RestServerNodeDirector {
  private builder: RestServerNodeBuilder;
  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new RestServerNodeBuilder(tree);
  }
  buildRestServer(): RestServerNode {
    const orNode = new LogicalOrExpressionBuilder()
      .withLeftExpression(new IdentifierExpressionBuilder().withValue('env.FASTIFY_PORT').build())
      .withRightExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(3002))
      .build();

    return this.builder
      .withPort(
        new SetupExpressionNodeBuilder()
          .withExpression(new LogicalExpressionBuilder().withORExpression(orNode).build())
          .build(),
      )
      .withRoutes(
        new ServerRoutesNodeBuilder()
          .withServerRoutes([
            new ServerRouteNodeBuilder()
              .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
              .withInstanceName(
                new IdentifierNodeBuilder().withName('helloWorldRESTRouter').build(),
              )
              .build(),
          ])
          .build(),
      )
      .withAPIPrefix(new StringLiteralBuilder().withValue('/').build())
      .withServerType(
        new ServerTypeIdentifierNodeBuilder().withServerTypeIdentifier('REST.Fastify').build(),
      )
      .build();
  }
}
