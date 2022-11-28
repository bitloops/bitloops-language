import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { ErrorEvaluationNode } from '../../../nodes/Expression/Evaluation/ErrorEvaluation.js';
import { NameNode } from '../../../nodes/NameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ErrorEvaluationNodeBuilder implements IBuilder<ErrorEvaluationNode> {
  private errorEvaluationNode: ErrorEvaluationNode;
  private name: NameNode;
  private argumentListNode?: ArgumentListNode;

  constructor() {
    this.errorEvaluationNode = new ErrorEvaluationNode();
  }

  public withName(name: NameNode): ErrorEvaluationNodeBuilder {
    this.name = name;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): ErrorEvaluationNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): ErrorEvaluationNode {
    this.errorEvaluationNode.addChild(this.name);
    if (this.argumentListNode) {
      this.errorEvaluationNode.addChild(this.argumentListNode);
    }

    this.errorEvaluationNode.buildObjectValue();

    return this.errorEvaluationNode;
  }
}
