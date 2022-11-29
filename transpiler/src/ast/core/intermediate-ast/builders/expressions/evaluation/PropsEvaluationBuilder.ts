import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { PropsEvaluationNode } from '../../../nodes/Expression/Evaluation/PropsEvaluation.js';
import { NameNode } from '../../../nodes/NameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class PropsEvaluationNodeBuilder implements IBuilder<PropsEvaluationNode> {
  private structEvaluationNode: PropsEvaluationNode;
  private name: NameNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor() {
    this.structEvaluationNode = new PropsEvaluationNode();
  }

  public withName(name: NameNode): PropsEvaluationNodeBuilder {
    this.name = name;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): PropsEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): PropsEvaluationNode {
    this.structEvaluationNode.addChild(this.name);
    this.structEvaluationNode.addChild(this.evaluationFieldListNode);

    this.structEvaluationNode.buildObjectValue();

    return this.structEvaluationNode;
  }
}
