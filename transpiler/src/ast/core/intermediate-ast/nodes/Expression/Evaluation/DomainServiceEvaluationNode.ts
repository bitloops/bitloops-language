import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class DomainServiceEvaluationNode extends EvaluationNode {
  private static domainServiceNodeName = 'domainService';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainServiceEvaluation;
    this.classNodeName = DomainServiceEvaluationNode.domainServiceNodeName;
  }
  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier) as IdentifierNode;
    return identifier;
  }
}
