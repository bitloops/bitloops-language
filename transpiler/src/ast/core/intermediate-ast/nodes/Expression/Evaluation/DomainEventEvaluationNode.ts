import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class DomainEventEvaluationNode extends EvaluationNode {
  private static key = 'domainEvent';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainEventEvaluation;
    this.classNodeName = DomainEventEvaluationNode.key;
  }

  public getInferredType(): string {
    const domainEventEvaluationIdentifier = this.getIdentifierNode().getValue().identifier;
    return domainEventEvaluationIdentifier;
  }
}
