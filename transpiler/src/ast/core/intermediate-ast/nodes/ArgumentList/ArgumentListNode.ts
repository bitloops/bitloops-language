import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ArgumentNode } from './ArgumentNode.js';

const NAME = 'argumentList';

export class ArgumentListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArgumentList, metadata, NAME);
  }

  get arguments(): ArgumentNode[] {
    return this.getChildrenNodesByType<ArgumentNode>(BitloopsTypesMapping.TArgument);
  }
}
