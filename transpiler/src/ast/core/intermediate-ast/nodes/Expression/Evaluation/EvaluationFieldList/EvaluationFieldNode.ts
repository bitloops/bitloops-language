import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';
import { NameNode } from '../../../NameNode.js';
import { ExpressionNode } from '../../ExpressionNode.js';

const NAME = 'evaluationField';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class EvaluationFieldNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEvaluationField, metadata, NAME);
  }
  getName(): NameNode {
    return this.getChildren().find((child) => child instanceof NameNode);
  }
  getExpression(): ExpressionNode {
    return this.getChildren().find((child) => child instanceof ExpressionNode) as ExpressionNode;
  }
}
