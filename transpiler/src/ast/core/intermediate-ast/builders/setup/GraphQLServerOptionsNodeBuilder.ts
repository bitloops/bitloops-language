import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { GraphQLServerOptionsNode } from '../../nodes/setup/GraphQLServerOptionsNode.js';
import { EvaluationFieldListNode } from '../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';

export class GraphQLServerOptionsNodeBuilder implements IBuilder<GraphQLServerOptionsNode> {
  private serverOptionsNode: GraphQLServerOptionsNode;
  private fieldList: EvaluationFieldListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverOptionsNode = new GraphQLServerOptionsNode(nodeMetadata);
  }

  public withFields(fieldList: EvaluationFieldListNode): GraphQLServerOptionsNodeBuilder {
    this.fieldList = fieldList;
    return this;
  }

  public build(): GraphQLServerOptionsNode {
    this.serverOptionsNode.addChild(this.fieldList);
    this.serverOptionsNode.buildObjectValue();

    return this.serverOptionsNode;
  }
}
