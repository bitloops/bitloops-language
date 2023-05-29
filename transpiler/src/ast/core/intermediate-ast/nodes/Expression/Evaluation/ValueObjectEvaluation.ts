import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ValueObjectEvaluationSymbolEntry } from '../../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ValueObjectIdentifierNode } from '../../valueObject/ValueObjectIdentifierNode.js';
import { DomainEvaluationNode } from './DomainEvaluation/DomainEvaluation.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'valueObject';
export class ValueObjectEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TValueObjectEvaluation;
    this.classNodeName = NAME;
  }

  public override getIdentifierNode(): ValueObjectIdentifierNode {
    return this.domainEvaluationNode.getValueObjectIdentifierNode();
  }

  private get domainEvaluationNode(): DomainEvaluationNode {
    return this.getChildNodeByType<DomainEvaluationNode>(BitloopsTypesMapping.TDomainEvaluation);
  }

  getVOIdentifier(): string {
    return this.getIdentifierNode().getIdentifierName();
  }

  getStringValue(): string {
    return this.getVOIdentifier() + '.create()';
  }

  getInferredType(symbolTableManager: SymbolTableManager): string {
    const intermediateASTTree = symbolTableManager.getIntermediateASTTree();
    const voNode = intermediateASTTree.getValueObjectByIdentifier(this.getVOIdentifier());
    const voReturnType = voNode.getCreateNode().getReturnType().getInferredType();
    return voReturnType;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    symbolTable.insert(
      this.getStringValue(),
      new ValueObjectEvaluationSymbolEntry(this.getInferredType(symbolTableManager)),
    );
  }
}
