import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class DomainServiceEvaluationNode extends EvaluationNode {
  private static domainServiceNodeName = 'domainService';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainServiceEvaluation;
    this.classNodeName = DomainServiceEvaluationNode.domainServiceNodeName;
  }

  public getInferredType(): string {
    const commandEvaluationIdentifier = this.getIdentifierNode().getValue().identifier;
    return commandEvaluationIdentifier;
  }
}
