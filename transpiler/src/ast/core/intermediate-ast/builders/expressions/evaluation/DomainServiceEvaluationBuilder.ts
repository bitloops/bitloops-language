import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { DomainServiceEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainServiceEvaluationNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DomainServiceEvaluationNodeBuilder implements IBuilder<DomainServiceEvaluationNode> {
  private domainServiceEvaluationNode: DomainServiceEvaluationNode;
  private identifier: IdentifierNode;
  private argumentListNode?: ArgumentListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.domainServiceEvaluationNode = new DomainServiceEvaluationNode(nodeMetadata);
  }

  public withIdentifier(identifier: IdentifierNode): DomainServiceEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): DomainServiceEvaluationNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): DomainServiceEvaluationNode {
    this.domainServiceEvaluationNode.addChild(this.identifier);
    if (this.argumentListNode) {
      this.domainServiceEvaluationNode.addChild(this.argumentListNode);
    }

    this.domainServiceEvaluationNode.buildObjectValue();

    return this.domainServiceEvaluationNode;
  }
}
