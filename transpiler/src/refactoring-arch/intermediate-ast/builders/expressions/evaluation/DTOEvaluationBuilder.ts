import { DTOEvaluationNode } from '../../../nodes/Expression/Evaluation/DTOEvaluation.js';
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { NameNode } from '../../../nodes/NameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DTOEvaluationNodeBuilder implements IBuilder<DTOEvaluationNode> {
  private dtoEvaluationNode: DTOEvaluationNode;
  private name: NameNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor() {
    this.dtoEvaluationNode = new DTOEvaluationNode();
  }

  public withName(name: NameNode): DTOEvaluationNodeBuilder {
    this.name = name;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): DTOEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): DTOEvaluationNode {
    this.dtoEvaluationNode.addChild(this.name);
    this.dtoEvaluationNode.addChild(this.evaluationFieldListNode);

    this.dtoEvaluationNode.buildObjectValue();

    return this.dtoEvaluationNode;
  }
}
