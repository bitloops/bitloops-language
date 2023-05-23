import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { DTOIdentifierNode } from '../../DTO/DTOIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'dto';
export class DTOEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TDTOEvaluation;
    this.classNodeName = NAME;
  }

  public override getIdentifierNode(): DTOIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TDTOIdentifier,
    ) as DTOIdentifierNode;
    return identifier;
  }

  public getInferredType(): string {
    const commandEvaluationIdentifier = this.getIdentifierNode().getValue().identifier;
    return commandEvaluationIdentifier;
  }
}
