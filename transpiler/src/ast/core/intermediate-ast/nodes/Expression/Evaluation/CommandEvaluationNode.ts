import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { EvaluationNode } from './EvaluationNode.js';

export class CommandEvaluationNode extends EvaluationNode {
  private static commandNodeName = 'command';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TCommandEvaluation;
    this.classNodeName = CommandEvaluationNode.commandNodeName;
  }

  public getInferredType(): string {
    const commandEvaluationIdentifier = this.getIdentifierNode().getValue().identifier;
    return commandEvaluationIdentifier;
  }
}
