import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from '../../valueObject/ValueObjectIdentifierNode.js';
import { DomainEvaluationNode } from './DomainEvaluation/DomainEvaluation.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'valueObject';
export class ValueObjectEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TValueObjectEvaluation;
    this.classNodeName = NAME;
  }

  public override getIdentifierNode(): ValueObjectIdentifierNode {
    return this.domainEvaluationNode.getValueObjectIdentifierNode();
  }

  private get domainEvaluationNode(): DomainEvaluationNode {
    return this.getChildNodeByType<DomainEvaluationNode>(BitloopsTypesMapping.TDomainEvaluation);
  }

  public getInferredType(): string {
    const voIdentifier = this.getIdentifierNode().getIdentifierName();
    return voIdentifier;
  }
}
