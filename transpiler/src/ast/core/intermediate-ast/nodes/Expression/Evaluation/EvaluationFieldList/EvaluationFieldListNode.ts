import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
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

  public getFields(): EvaluationFieldNode[] {
    return this.getChildrenNodesByType<EvaluationFieldNode>(BitloopsTypesMapping.TEvaluationField);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const evaluationFieldNodes = this.getFields();
    evaluationFieldNodes.forEach((evaluationField) => {
      const evaluationFieldExpression = evaluationField.getExpression();
      evaluationFieldExpression.addToSymbolTable(symbolTableManager);
    });
  }
}
