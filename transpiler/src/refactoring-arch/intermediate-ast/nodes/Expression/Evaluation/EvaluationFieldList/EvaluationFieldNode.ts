import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../../../IntermediateASTNode.js';

const NAME = 'evaluationField';

// THis type will change to something like = { evaluationField: { name: string } & TExpression }
// export type TEvaluationField = ({ name: string } & TExpression)[];

export class EvaluationFieldNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TEvaluationField, { lines }, NAME);
  }
}
