import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { packageConcretionKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../setup/BoundedContextModuleNode.js';
import { PackageAdapterIdentifierNode } from './packageAdapters/PackageAdapterIdentifierNode.js';

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
  public getPackageAdapterIdentifier(): PackageAdapterIdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TPackageAdapterIdentifier);
    if (!identifier) {
      throw new Error('Package adapter identifier not found');
    }
    return identifier as PackageAdapterIdentifierNode;
  }
}
