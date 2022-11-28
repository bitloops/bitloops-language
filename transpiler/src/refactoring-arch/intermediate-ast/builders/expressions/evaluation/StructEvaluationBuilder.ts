import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { StructEvaluationNode } from '../../../nodes/Expression/Evaluation/StructEvaluation.js';
import { NameNode } from '../../../nodes/NameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class StructEvaluationNodeBuilder implements IBuilder<StructEvaluationNode> {
  private structEvaluationNode: StructEvaluationNode;
  private name: NameNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor() {
    this.structEvaluationNode = new StructEvaluationNode();
  }

  public withName(name: NameNode): StructEvaluationNodeBuilder {
    this.name = name;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): StructEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): StructEvaluationNode {
    this.structEvaluationNode.addChild(this.name);
    this.structEvaluationNode.addChild(this.evaluationFieldListNode);

    this.structEvaluationNode.buildObjectValue();

    return this.structEvaluationNode;
  }
}
