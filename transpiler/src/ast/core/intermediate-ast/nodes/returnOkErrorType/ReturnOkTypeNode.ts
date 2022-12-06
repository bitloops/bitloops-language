import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ReturnOkTypeNode extends IntermediateASTNode {
  private static classNodeName = 'ok';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TReturnOkType, metadata, ReturnOkTypeNode.classNodeName);
  }
}
