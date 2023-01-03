import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ModuleNameNode extends IntermediateASTNode {
  private static classNodeName = 'moduleName';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TModuleName, metadata, ModuleNameNode.classNodeName);
  }
}
