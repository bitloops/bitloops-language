import { DomainEvaluationNode } from '../../../nodes/Expression/Evaluation/DomainEvaluation/DomainEvaluation.js';
import { EntityEvaluationNode } from '../../../nodes/Expression/Evaluation/EntityEvaluation.js';
import { IBuilder } from '../../IBuilder.js';

export class EntityEvaluationNodeBuilder implements IBuilder<EntityEvaluationNode> {
  private entityEvaluationNode: EntityEvaluationNode;
  private domainEvaluation: DomainEvaluationNode;

  constructor() {
    this.entityEvaluationNode = new EntityEvaluationNode();
  }

  public withDomainEvaluation(domainEvaluation: DomainEvaluationNode): EntityEvaluationNodeBuilder {
    this.domainEvaluation = domainEvaluation;
    return this;
  }

  public build(): EntityEvaluationNode {
    this.entityEvaluationNode.addChild(this.domainEvaluation);

    this.entityEvaluationNode.buildObjectValue();

    return this.entityEvaluationNode;
  }
}
