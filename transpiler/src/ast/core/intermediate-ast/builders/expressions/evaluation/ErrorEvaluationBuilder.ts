import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { ErrorIdentifierNode } from '../../../nodes/ErrorIdentifiers/ErrorIdentifierNode.js';
import { ErrorEvaluationNode } from '../../../nodes/Expression/Evaluation/ErrorEvaluation.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ErrorEvaluationNodeBuilder implements IBuilder<ErrorEvaluationNode> {
  private errorEvaluationNode: ErrorEvaluationNode;
  private identifier: ErrorIdentifierNode;
  private argumentListNode?: ArgumentListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.errorEvaluationNode = new ErrorEvaluationNode(nodeMetadata);
  }

  public withIdentifier(identifier: ErrorIdentifierNode): ErrorEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): ErrorEvaluationNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): ErrorEvaluationNode {
    this.errorEvaluationNode.addChild(this.identifier);
    if (this.argumentListNode) {
      this.errorEvaluationNode.addChild(this.argumentListNode);
    }

    this.errorEvaluationNode.buildObjectValue();

    return this.errorEvaluationNode;
  }
}
