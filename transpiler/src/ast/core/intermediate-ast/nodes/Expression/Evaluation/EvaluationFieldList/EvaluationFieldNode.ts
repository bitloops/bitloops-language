import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { IdentifierNode } from '../../../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';
import { ExpressionNode } from '../../ExpressionNode.js';

const NAME = 'evaluationField';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class EvaluationFieldNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEvaluationField, metadata, NAME);
  }
  getIdentifier(): IdentifierNode {
    return this.getChildren().find((child) => child instanceof IdentifierNode) as IdentifierNode;
  }
  getExpression(): ExpressionNode {
    return this.getChildren().find((child) => child instanceof ExpressionNode) as ExpressionNode;
  }
}
