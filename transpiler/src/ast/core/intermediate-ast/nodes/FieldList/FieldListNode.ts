import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { fieldsKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { FieldNode } from './FieldNode.js';

export class FieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariables, metadata, fieldsKey);
  }

  getFieldNodes(): FieldNode[] {
    const fieldNodes = this.getChildrenNodesByType<FieldNode>(BitloopsTypesMapping.TVariable);
    return fieldNodes;
  }
}
