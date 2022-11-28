import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { fieldsKey } from '../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class FieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariables, metadata, fieldsKey);
  }
}
