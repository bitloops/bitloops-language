import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ErrorIdentifierNode } from '../../ErrorIdentifiers/ErrorIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

const NAME = 'errorEvaluation';
export class ErrorEvaluationNode extends EvaluationNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TErrorEvaluation;
    this.classNodeName = NAME;
  }

  public override getIdentifierNode(): ErrorIdentifierNode {
    const identifier = this.getChildNodeByType<ErrorIdentifierNode>(
      BitloopsTypesMapping.TIdentifier,
    );
    return identifier;
  }

  public getInferredType(): string {
    const commandEvaluationIdentifier = this.getIdentifierNode().getValue().identifier;
    return commandEvaluationIdentifier;
  }
}
