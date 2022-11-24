import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../ExpressionNode.js';
import { BooleanLiteralNode } from './BooleanLiteralNode.js';
import { NullLiteralNode } from './NullLiteralNode.js';
import { StringLiteralNode } from './StringLiteralNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

// export abstract class LiteralNode extends ExpressionNode {
//   isStringLiteral(): this is StringLiteralNode {
//     throw new Error('Not implemeneted');
//   }

//   isBooleanLiteral(): this is BooleanLiteralNode {
//     throw new Error('Not implemeneted');
//   }
//   isNullLiteral(): this is NullLiteralNode {
//     throw new Error('Not implemeneted');
//   }
// }

const name = 'literal';
export class LiteralNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);

    this.classNodeName = name;
    this.nodeType = BitloopsTypesMapping.TLiteral;
  }

  isStringLiteral(): this is StringLiteralNode {
    throw new Error('Not implemeneted');
  }

  isBooleanLiteral(): this is BooleanLiteralNode {
    throw new Error('Not implemeneted');
  }
  isNullLiteral(): this is NullLiteralNode {
    throw new Error('Not implemeneted');
  }
}
