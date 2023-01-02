import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ModuleNode extends IntermediateASTNode {
  private static classNodeName = 'module';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TModule, metadata, ModuleNode.classNodeName);
  }
}
