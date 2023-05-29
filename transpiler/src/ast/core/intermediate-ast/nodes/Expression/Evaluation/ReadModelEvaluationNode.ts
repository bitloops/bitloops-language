import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ReadModelIdentifierNode } from '../../readModel/ReadModelIdentifierNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class ReadModelEvaluationNode extends EvaluationNode {
  private static readModelEvaluationNodeName = 'readModelEvaluation';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TReadModelEvaluation;
    this.classNodeName = ReadModelEvaluationNode.readModelEvaluationNodeName;
  }

  public override getIdentifierNode(): ReadModelIdentifierNode {
    return this.getChildNodeByType<ReadModelIdentifierNode>(
      BitloopsTypesMapping.TReadModelIdentifier,
    );
  }

  public getInferredType(_symbolTableManager: SymbolTableManager): string {
    const readModelIdentifier = this.getIdentifierNode().getValue().identifier;
    return readModelIdentifier;
  }
}
