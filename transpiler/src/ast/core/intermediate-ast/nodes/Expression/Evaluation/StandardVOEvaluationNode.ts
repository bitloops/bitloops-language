import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class StandardVOEvaluationNode extends EvaluationNode {
  static nodeName = 'standardVO';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStandardVOEvaluation;
    this.classNodeName = StandardVOEvaluationNode.nodeName;
  }

  public getInferredType(): string {
    const standardVOIdentifier = this.getIdentifierNode().getValue().identifier;
    return standardVOIdentifier;
  }
}
