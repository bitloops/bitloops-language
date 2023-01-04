import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { RepoConnectionOptionsNode } from '../../../nodes/setup/repo/RepoConnectionOptionsNode.js';
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';

export class RepoConnectionOptionsNodeBuilder implements IBuilder<RepoConnectionOptionsNode> {
  private evaluationFieldList: EvaluationFieldListNode;
  private repoConnectionExpressionNode: RepoConnectionOptionsNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoConnectionExpressionNode = new RepoConnectionOptionsNode(metadata);
  }

  public withFields(
    evaluationFieldList: EvaluationFieldListNode,
  ): RepoConnectionOptionsNodeBuilder {
    this.evaluationFieldList = evaluationFieldList;
    return this;
  }

  public build(): RepoConnectionOptionsNode {
    this.repoConnectionExpressionNode.addChild(this.evaluationFieldList);

    this.repoConnectionExpressionNode.buildObjectValue();

    return this.repoConnectionExpressionNode;
  }
}
