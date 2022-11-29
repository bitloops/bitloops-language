import { DomainEvaluationNode } from '../../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { DomainEvaluationPropsNode } from '../../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluationProps.js';
import { NameNode } from '../../../../nodes/NameNode.js';
import { IBuilder } from '../../../IBuilder.js';

export class DomainEvaluationNodeBuilder implements IBuilder<DomainEvaluationNode> {
  private nameNode: NameNode;
  private domainEvaluationPropsNode: DomainEvaluationPropsNode;
  private domainEvaluationNode: DomainEvaluationNode;

  constructor() {
    this.domainEvaluationNode = new DomainEvaluationNode();
  }

  public withName(name: NameNode): DomainEvaluationNodeBuilder {
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
