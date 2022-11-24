import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'assignmentExpression';
export class AssignmentExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TAssignmentExpression, { lines: lines! }, NAME);
  }
}
