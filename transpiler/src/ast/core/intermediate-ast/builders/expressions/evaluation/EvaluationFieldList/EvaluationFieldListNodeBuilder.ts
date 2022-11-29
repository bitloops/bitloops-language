import { EvaluationFieldListNode } from '../../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { EvaluationFieldNode } from '../../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class EvaluationFieldListNodeBuilder implements IBuilder<EvaluationFieldListNode> {
  private fieldListNode: EvaluationFieldListNode;
  private evaluationFieldNodes: EvaluationFieldNode[];

  constructor() {
    this.fieldListNode = new EvaluationFieldListNode();
  }

  public withEvaluationFields(evalFields: EvaluationFieldNode[]): EvaluationFieldListNodeBuilder {
    this.evaluationFieldNodes = evalFields;
    return this;
  }

  public build(): EvaluationFieldListNode {
    if (this.evaluationFieldNodes) {
      this.evaluationFieldNodes.forEach((fieldNode) => {
        this.fieldListNode.addChild(fieldNode);
      });
    }
    this.fieldListNode.buildArrayValue();

    return this.fieldListNode;
  }
}
