import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextNameNode } from './BoundedContextNameNode.js';
import { ModuleNameNode } from './ModuleNameNode.js';

export class BoundedContextModuleNode extends IntermediateASTNode {
  private static classNodeName = 'boundedContextModule';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TBoundedContextModule,
      metadata,
      BoundedContextModuleNode.classNodeName,
    );
  }

  public getModule(): ModuleNameNode {
    const moduleNameNode = this.getChildNodeByType<ModuleNameNode>(
      BitloopsTypesMapping.TModuleName,
    );
    if (!moduleNameNode) {
      throw new Error('Module not found');
    }
    return moduleNameNode;
  }

  public getBoundedContext(): BoundedContextNameNode {
    const boundedContextNameNode = this.getChildNodeByType<BoundedContextNameNode>(
      BitloopsTypesMapping.TBoundedContextName,
    );
    if (!boundedContextNameNode) {
      throw new Error('BoundedContext not found');
    }
    return boundedContextNameNode;
  }
}
