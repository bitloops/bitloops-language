import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';
import { EvaluationFieldListNode } from '../EvaluationFieldList/EvaluationFieldListNode.js';

const NAME = 'props';
export class DomainEvaluationPropsNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainEvaluationProps, metadata, NAME);
  }
  getEvaluationFieldList(): EvaluationFieldListNode {
    const evaluationFieldList = this.getChildNodeByType<EvaluationFieldListNode>(
      BitloopsTypesMapping.TEvaluationFields,
    );
    return evaluationFieldList;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const evaluationFieldList = this.getEvaluationFieldList();
    if (evaluationFieldList) {
      evaluationFieldList.addToSymbolTable(symbolTableManager);
    }
  }
}
