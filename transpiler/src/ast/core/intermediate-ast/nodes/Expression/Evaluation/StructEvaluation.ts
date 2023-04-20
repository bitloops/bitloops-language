import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
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

  public typeCheck(symbolTable: SymbolTable): void {
    const evaluationFields = this.getEvaluationFields();
    evaluationFields.forEach((evaluationField) => {
      evaluationField.getExpression().typeCheck(symbolTable);
    });
  }
}
