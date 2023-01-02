// import { ExpressionBuilderDirector } from '../../../../../../__tests__/ast/core/builders/expressionDirector.js';
// import { IntermediateASTTree } from '../../IntermediateASTTree.js';
// import { IntermediateASTRootNode } from '../../nodes/RootNode.js';
// import { RestServerNode } from '../../nodes/setup/RestServerNode.js';
// import { IdentifierExpressionBuilder } from '../expressions/IdentifierExpressionBuilder.js';
// import { StringLiteralBuilder } from '../expressions/literal/StringLiteralBuilder.js';
// import { LogicalOrExpressionBuilder } from '../expressions/Logical/logicalOrExpressionBuilder.js';
// import { IdentifierNodeBuilder } from '../identifier/IdentifierBuilder.js';
// import { RestServerNodeBuilder } from './RestServerNodeBuilder.js';
// import { ServerOptionsNodeBuilder } from './ServerOptionsNodeBuilder.js';
// import { ServerRouteNodeBuilder } from './ServerRouteNodeBuilder.js';
// import { ServerRoutesNodeBuilder } from './ServerRoutesNodeBuilder.js';
// import { ServerTypeIdentifierNodeBuilder } from './ServerTypeIdentifierNodeBuilder.js';

// export class RestServerNodeDirector {
//   private builder: RestServerNodeBuilder;
//   constructor() {
//     const tree = new IntermediateASTTree(new IntermediateASTRootNode());
//     this.builder = new RestServerNodeBuilder(tree);
//   }
//   buildRestServer(): RestServerNode {
//     const portExpression = new LogicalOrExpressionBuilder()
//       .withLeftExpression(new IdentifierExpressionBuilder().withValue('env.FASTIFY_PORT').build())
//       .withRightExpression(new ExpressionBuilderDirector().buildInt32LiteralExpression(3002))
//       .build();

//     return (
//       this.builder
//         // .withPort(
//         //   new SetupExpressionNodeBuilder()
//         //     .withExpression(new LogicalExpressionBuilder().withORExpression(orNode).build())
//         //     .build(),
//         // )
//         .withRoutes(
//           new ServerRoutesNodeBuilder()
//             .withServerRoutes([
//               new ServerRouteNodeBuilder()
//                 .withRouterPrefix(new StringLiteralBuilder().withValue('/hello').build())
//                 .withInstanceName(
//                   new IdentifierNodeBuilder().withName('helloWorldRESTRouter').build(),
//                 )
//                 .build(),
//             ])
//             .build(),
//         )
//         .withServerOptions(
//           new ServerOptionsNodeBuilder()
//             .withAPIPrefix(new StringLiteralBuilder().withValue('/').build())
//             .withPort(portExpression)
//             .withServerType(
//               new ServerTypeIdentifierNodeBuilder()
//                 .withServerTypeIdentifier('REST.Fastify')
//                 .build(),
//             )
//             .build(),
//         )
//         // .withAPIPrefix(new StringLiteralBuilder().withValue('/').build())
//         // .withServerType(
//         //   new ServerTypeIdentifierNodeBuilder().withServerTypeIdentifier('REST.Fastify').build(),
//         // )
//         .build()
//     );
//   }
// }
