import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { DomainEventIdentifierNode } from '../../DomainEvent/DomainEventIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class DomainEventEvaluationNode extends EvaluationNode {
  private static key = 'domainEvent';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainEventEvaluation;
    this.classNodeName = DomainEventEvaluationNode.key;
  }

  public override getIdentifierNode(): DomainEventIdentifierNode {
    const identifier = this.getChildNodeByType<DomainEventIdentifierNode>(
      BitloopsTypesMapping.TDomainEventIdentifier,
    );

    return identifier;
  }

  public getInferredType(): string {
    const domainEventEvaluationIdentifier =
      this.getIdentifierNode().getValue().DomainEventIdentifier;
    return domainEventEvaluationIdentifier;
  }
}
