import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

export class ExpressionNode extends IntermediateASTNode {
  public readonly NAME = 'Expression';

  constructor(lines?: string) {
    super(BitloopsTypesMapping.TExpression, lines);
    this.setName(this.NAME);
  }
}
