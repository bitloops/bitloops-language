import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export class ArrowFunctionBodyNode extends IntermediateASTNode {
  private static classNodeName = 'arrowFunctionBody';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArrowFunctionBody, metadata, ArrowFunctionBodyNode.classNodeName);
  }
}
