import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { packageConcretionKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../setup/BoundedContextModuleNode.js';

export class PackageConcretionNode extends IntermediateASTNode {
  private static classNodeName = packageConcretionKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TPackageConcretion, metadata, PackageConcretionNode.classNodeName);
  }
  public getBoundedContextModule(): BoundedContextModuleNode {
    const boundedContextModule = this.getChildNodeByType<BoundedContextModuleNode>(
      BitloopsTypesMapping.TBoundedContextModule,
    );
    if (!boundedContextModule) {
      throw new Error('BoundedContext module not found');
    }
    return boundedContextModule;
  }
}
