import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export class ConstDeclarationListNode extends IntermediateASTNode {
  private static classNodeName = 'constants';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TConstDeclarationList,
      metadata,
      ConstDeclarationListNode.classNodeName,
    );
  }
}
