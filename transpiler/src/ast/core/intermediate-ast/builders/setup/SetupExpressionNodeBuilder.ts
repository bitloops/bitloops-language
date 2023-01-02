// import { IBuilder } from '../IBuilder.js';
// import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
// import { SetupExpressionNode } from '../../nodes/setup/SetupExpressionNode.js';
// import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';

// export class SetupExpressionNodeBuilder implements IBuilder<SetupExpressionNode> {
//   private setupExpressionNode: SetupExpressionNode;
//   private expression: ExpressionNode;
//   private environmentVariableExpression: ExpressionNode;

//   constructor(nodeMetadata?: TNodeMetadata) {
//     this.setupExpressionNode = new SetupExpressionNode(nodeMetadata);
//   }

//   public withExpression(expression: ExpressionNode): SetupExpressionNodeBuilder {
//     this.expression = expression;
//     return this;
//   }

//   public withEnvironmentVariableExpression(
//     environmentVariableExpression: ExpressionNode,
//   ): SetupExpressionNodeBuilder {
//     this.environmentVariableExpression = environmentVariableExpression;
//     return this;
//   }

//   public build(): SetupExpressionNode {
//     if (this.expression) {
//       this.setupExpressionNode.addChild(this.expression);
//     } else if (this.environmentVariableExpression) {
//       this.setupExpressionNode.addChild(this.environmentVariableExpression);
//     }

//     return this.setupExpressionNode;
//   }
// }
