import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { EntityEvaluationSymbolEntry } from '../../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { DomainEvaluationNode } from './DomainEvaluation/DomainEvaluation.js';
import { EvaluationNode } from './EvaluationNode.js';

export class EntityEvaluationNode extends EvaluationNode {
  private static entityNodeName = 'entity';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TEntityEvaluation;
    this.classNodeName = EntityEvaluationNode.entityNodeName;
  }

  private get domainEvaluationNode(): DomainEvaluationNode {
    return this.getChildNodeByType<DomainEvaluationNode>(BitloopsTypesMapping.TDomainEvaluation);
  }

  getEntityIdentifier(): string {
    const domainEvaluationNode = this.getChildNodeByType<DomainEvaluationNode>(
      BitloopsTypesMapping.TDomainEvaluation,
    );
    const entityIdentifier = domainEvaluationNode.getEntityIdentifier();
    return entityIdentifier;
  }

  getStringValue(): string {
    return this.getEntityIdentifier() + '.create()';
  }

  getInferredType(symbolTableManager: SymbolTableManager): string {
    const intermediateASTTree = symbolTableManager.getIntermediateASTTree();
    const entityNode =
      intermediateASTTree.getRootEntityByIdentifier(this.getEntityIdentifier()) ??
      intermediateASTTree.getEntityByIdentifier(this.getEntityIdentifier());
    const entityReturnType = entityNode.getDomainCreateNode().getReturnType().getInferredType();
    return entityReturnType;
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const domainEvaluationNode = this.domainEvaluationNode;
    domainEvaluationNode.addToSymbolTable(symbolTableManager);
    symbolTable.insert(
      this.getStringValue(),
      new EntityEvaluationSymbolEntry(this.getInferredType(symbolTableManager)),
    );
  }
}
