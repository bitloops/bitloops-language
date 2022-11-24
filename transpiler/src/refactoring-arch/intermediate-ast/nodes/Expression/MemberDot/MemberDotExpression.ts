import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';

const NAME = 'MemberDotExpression';
export class MemberDotExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TMemberDotExpression, { lines: lines! }, NAME);
  }
}
