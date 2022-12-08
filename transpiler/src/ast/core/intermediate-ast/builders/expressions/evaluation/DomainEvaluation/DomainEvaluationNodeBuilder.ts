import { EntityIdentifierNode } from '../../../../nodes/Entity/EntityIdentifierNode.js';
import { DomainEvaluationNode } from '../../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { DomainEvaluationPropsNode } from '../../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { TNodeMetadata } from '../../../../nodes/IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from '../../../../nodes/valueObject/ValueObjectIdentifierNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class DomainEvaluationNodeBuilder implements IBuilder<DomainEvaluationNode> {
  private nameNode: EntityIdentifierNode | ValueObjectIdentifierNode;
  private domainEvaluationPropsNode: DomainEvaluationPropsNode;
  private domainEvaluationNode: DomainEvaluationNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainEvaluationNode = new DomainEvaluationNode(metadata);
  }

  public withIdentifier(
    name: EntityIdentifierNode | ValueObjectIdentifierNode,
  ): DomainEvaluationNodeBuilder {
    this.nameNode = name;
    return this;
  }

  public withProps(props: DomainEvaluationPropsNode): DomainEvaluationNodeBuilder {
    this.domainEvaluationPropsNode = props;
    return this;
  }

  public build(): DomainEvaluationNode {
    this.domainEvaluationNode.addChild(this.nameNode);
    this.domainEvaluationNode.addChild(this.domainEvaluationPropsNode);

    this.domainEvaluationNode.buildObjectValue();

    return this.domainEvaluationNode;
  }
}
