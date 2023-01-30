import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterOptionsKey } from '../../../../../../types.js';
import { EvaluationFieldListNode } from '../../Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoAdapterOptionsNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRepoAdapterOptions, metadata, RepoAdapterOptionsNode.classNodeName);
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
