import { LiteralNode } from '../LiteralNode.js';
import { DecimalLiteralNode } from './DecimalLiteralNode.js';
import { IntegerLiteralNode } from './IntegerLiteralNode.js';

export abstract class NumericLiteralNode extends LiteralNode {
  isIntegerLiteral(): this is IntegerLiteralNode {
    throw new Error('Not implemeneted');
  }

  isDecimalLiteral(): this is DecimalLiteralNode {
    throw new Error('Not implemeneted');
  }
}
