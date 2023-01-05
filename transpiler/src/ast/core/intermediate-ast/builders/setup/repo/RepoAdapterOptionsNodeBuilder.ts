import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { RepoAdapterOptionsNode } from '../../../nodes/setup/repo/RepoAdapterOptionsNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RepoAdapterOptionsNodeBuilder implements IBuilder<RepoAdapterOptionsNode> {
  private repoAdapterOptionsNode: RepoAdapterOptionsNode;
  private evaluationFields: EvaluationFieldListNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoAdapterOptionsNode = new RepoAdapterOptionsNode(metadata);
  }

  public withFields(evaluationFields: EvaluationFieldListNode): RepoAdapterOptionsNodeBuilder {
    this.evaluationFields = evaluationFields;
    return this;
  }

  public build(): RepoAdapterOptionsNode {
    this.repoAdapterOptionsNode.addChild(this.evaluationFields);
    this.repoAdapterOptionsNode.buildObjectValue();

    return this.repoAdapterOptionsNode;
  }
}
