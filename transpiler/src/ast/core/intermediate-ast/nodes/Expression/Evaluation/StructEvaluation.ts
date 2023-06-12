import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { structIdentifierKey } from '../../../../../../types.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StructIdentifierNode } from '../../struct/StructIdentifierNode.js';
import { EvaluationFieldListNode } from './EvaluationFieldList/EvaluationFieldListNode.js';
import { EvaluationFieldNode } from './EvaluationFieldList/EvaluationFieldNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class StructEvaluationNode extends EvaluationNode {
  private static structEvaluationNodeName = 'struct';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStructEvaluation;
    this.classNodeName = StructEvaluationNode.structEvaluationNodeName;
  }

  getEvaluationFields(): EvaluationFieldNode[] {
    const evaluationFieldList = this.getChildNodeByType<EvaluationFieldListNode>(
      BitloopsTypesMapping.TEvaluationFields,
    );

    const evaluationFields = evaluationFieldList.getFields();
    return evaluationFields;
  }

  public typeCheck(symbolTableManager: SymbolTableManager): void {
    const evaluationFields = this.getEvaluationFields();
    evaluationFields.forEach((evaluationField) => {
      evaluationField.getExpression().typeCheck(symbolTableManager);
    });
  }

  public override getIdentifierNode(): StructIdentifierNode {
    return this.getChildNodeByType<StructIdentifierNode>(BitloopsTypesMapping.TStructIdentifier);
  }

  public getInferredType(): string {
    const structIdentifier = this.getIdentifierNode().getValue();
    return structIdentifier[structIdentifierKey];
  }
}
