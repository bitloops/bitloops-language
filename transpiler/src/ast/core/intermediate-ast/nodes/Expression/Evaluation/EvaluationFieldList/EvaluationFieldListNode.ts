import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { evaluationFieldsKey } from '../../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';
import { EvaluationFieldNode } from './EvaluationFieldNode.js';

export class EvaluationFieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEvaluationFields, metadata, evaluationFieldsKey);
  }
  public findFieldWithName(name: string): EvaluationFieldNode | undefined {
    const res = this.getChildren().find(
      (child) => (child as EvaluationFieldNode).getIdentifier().getValue().identifier === name,
    ) as EvaluationFieldNode;
    return res;
  }

  public getFieldCount(): number {
    return this.getChildren().length;
  }
}
