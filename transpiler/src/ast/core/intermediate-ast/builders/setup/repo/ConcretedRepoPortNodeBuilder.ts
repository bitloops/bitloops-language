import { TConcretedRepoPort } from '../../../../../../types.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConcretedRepoPortNode } from '../../../nodes/setup/repo/ConcretedRepoPortNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ConcretedRepoPortNodeBuilder implements IBuilder<ConcretedRepoPortNode> {
  private repoAdapterClassNameNode: ConcretedRepoPortNode;
  private portIdentifier: TConcretedRepoPort;

  constructor(metadata?: TNodeMetadata) {
    this.repoAdapterClassNameNode = new ConcretedRepoPortNode(metadata);
  }

  public withRepoPortIdentifier(portIdentifier: TConcretedRepoPort): ConcretedRepoPortNodeBuilder {
    this.portIdentifier = portIdentifier;
    return this;
  }

  public build(): ConcretedRepoPortNode {
    this.repoAdapterClassNameNode.buildLeafValue(this.portIdentifier);

    return this.repoAdapterClassNameNode;
  }
}
