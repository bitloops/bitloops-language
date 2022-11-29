import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../../IntermediateASTNode.js';
import { LiteralNode } from '../LiteralNode.js';
import { DecimalLiteralNode } from './DecimalLiteralNode.js';
import { IntegerLiteralNode } from './IntegerLiteralNode.js';

// export abstract class NumericLiteralNode extends LiteralNode {
//   isIntegerLiteral(): this is IntegerLiteralNode {
//     throw new Error('Not implemeneted');
//   }

//   isDecimalLiteral(): this is DecimalLiteralNode {
//     throw new Error('Not implemeneted');
//   }
// }

const name = 'numericLiteral';
export class NumericLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = name;
    this.nodeType = BitloopsTypesMapping.TNumericLiteral;
  }

  isIntegerLiteral(): this is IntegerLiteralNode {
    throw new Error('Not implemeneted');
  }

  isDecimalLiteral(): this is DecimalLiteralNode {
    throw new Error('Not implemeneted');
  }
}
