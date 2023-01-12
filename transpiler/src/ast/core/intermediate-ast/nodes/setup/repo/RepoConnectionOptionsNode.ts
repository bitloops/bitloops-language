import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionOptionsKey } from '../../../../../../types.js';
import { EvaluationFieldListNode } from '../../Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoConnectionOptionsNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionOptions,
      metadata,
      RepoConnectionOptionsNode.classNodeName,
    );
  }

  public getEvaluationFieldList(): EvaluationFieldListNode {
    const evaluationFieldList = this.getChildNodeByType<EvaluationFieldListNode>(
      BitloopsTypesMapping.TEvaluationFields,
    );
    if (!evaluationFieldList) {
      throw new Error('Evaluation fields not found');
    }
    return evaluationFieldList;
  }
}
