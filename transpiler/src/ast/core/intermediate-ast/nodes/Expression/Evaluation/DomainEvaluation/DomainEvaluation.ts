import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { EntityIdentifierNode } from '../../../Entity/EntityIdentifierNode.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { EvaluationNode } from '../EvaluationNode.js';

export class DomainEvaluationNode extends EvaluationNode {
  private static domainEvaluationNodeName = 'domainEvaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDomainEvaluation;
    this.classNodeName = DomainEvaluationNode.domainEvaluationNodeName;
  }

  getEntityIdentifier(): string {
    const entityIdentifier = this.getChildNodeByType<EntityIdentifierNode>(
      BitloopsTypesMapping.TEntityIdentifier,
    );
    if (!entityIdentifier) {
      throw new Error('Entity identifier not found');
    }
    return entityIdentifier.getIdentifierName();
  }
}
