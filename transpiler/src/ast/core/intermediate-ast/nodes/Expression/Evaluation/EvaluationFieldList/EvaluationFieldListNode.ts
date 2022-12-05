import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { evaluationFieldsKey } from '../../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';
import { EvaluationFieldNode } from './EvaluationFieldNode.js';

export class EvaluationFieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEvaluationFields, metadata, evaluationFieldsKey);
  }
  public findFieldWithName(name: string): EvaluationFieldNode | undefined {
    // this.getChildren().forEach((child) => {
    //   if (child instanceof EvaluationFieldNode) {
    //     console.log(child.getName().getValue().name);
    //   }
    // });
    return this.getChildren().find(
      (child) => (child as EvaluationFieldNode).getName().getValue().name === name,
    ) as EvaluationFieldNode;
  }
  public getFieldCount(): number {
    return this.getChildren().length;
  }
}
