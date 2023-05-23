import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { DomainEvaluationNode } from './DomainEvaluation/DomainEvaluation.js';
import { EvaluationNode } from './EvaluationNode.js';

export class EntityEvaluationNode extends EvaluationNode {
  private static entityNodeName = 'entity';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TEntityEvaluation;
    this.classNodeName = EntityEvaluationNode.entityNodeName;
  }

  getEntityIdentifier(): string {
    const domainEvaluationNode = this.getChildNodeByType<DomainEvaluationNode>(
      BitloopsTypesMapping.TDomainEvaluation,
    );
    const entityIdentifier = domainEvaluationNode.getEntityIdentifier();
    return entityIdentifier;
  }

  getInferredType(): string {
    return this.getEntityIdentifier();
  }
}
