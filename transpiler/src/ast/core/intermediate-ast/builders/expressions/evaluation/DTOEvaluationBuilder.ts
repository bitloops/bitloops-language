import { DTOIdentifierNode } from '../../../nodes/DTO/DTOIdentifierNode.js';
import { DTOEvaluationNode } from '../../../nodes/Expression/Evaluation/DTOEvaluation.js';
import { EvaluationFieldListNode } from '../../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldListNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';

export class DTOEvaluationNodeBuilder implements IBuilder<DTOEvaluationNode> {
  private dtoEvaluationNode: DTOEvaluationNode;
  private identifier: DTOIdentifierNode;
  private evaluationFieldListNode?: EvaluationFieldListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.dtoEvaluationNode = new DTOEvaluationNode(nodeMetadata);
  }

  public withIdentifier(identifier: DTOIdentifierNode): DTOEvaluationNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withEvaluationFieldList(
    evaluationFieldListNode: EvaluationFieldListNode,
  ): DTOEvaluationNodeBuilder {
    this.evaluationFieldListNode = evaluationFieldListNode;
    return this;
  }

  public build(): DTOEvaluationNode {
    this.dtoEvaluationNode.addChild(this.identifier);
    this.dtoEvaluationNode.addChild(this.evaluationFieldListNode);

    this.dtoEvaluationNode.buildObjectValue();

    return this.dtoEvaluationNode;
  }
}
