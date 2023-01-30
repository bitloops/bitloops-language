import { StringUtils } from '../../../../../../utils/index.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { ConcretedRepoPortNode } from '../../../nodes/setup/repo/ConcretedRepoPortNode.js';
import { DatabaseTypeNode } from '../../../nodes/setup/repo/DatabaseTypeNode.js';
import { RepoAdapterClassNameNode } from '../../../nodes/setup/repo/RepoAdapterClassNameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class RepoAdapterClassNameNodeBuilder implements IBuilder<RepoAdapterClassNameNode> {
  private repoAdapterClassNameNode: RepoAdapterClassNameNode;
  private dbType: DatabaseTypeNode;
  private repoPort: ConcretedRepoPortNode;

  constructor(metadata?: TNodeMetadata) {
    this.repoAdapterClassNameNode = new RepoAdapterClassNameNode(metadata);
  }

  public withDBType(dbType: DatabaseTypeNode): RepoAdapterClassNameNodeBuilder {
    this.dbType = dbType;
    return this;
  }

  public withRepoPort(repoPort: ConcretedRepoPortNode): RepoAdapterClassNameNodeBuilder {
    this.repoPort = repoPort;
    return this;
  }

  private getRepoAdapterName(
    repoPortNode: ConcretedRepoPortNode,
    dbTypeNode: DatabaseTypeNode,
  ): string {
    const repoPort = repoPortNode.getIdentifierName();
    const dbType = dbTypeNode.getDBType();
    const suffixToRemove = 'Port';
    const repoPortBaseName = repoPort.slice(0, repoPort.length - suffixToRemove.length);
    const dbTypeName = StringUtils.upperCaseFirstLetter(dbType).replace('DB.', '');
    return `${dbTypeName}${repoPortBaseName}`;
  }

  public build(): RepoAdapterClassNameNode {
    const repoAdapterName = this.getRepoAdapterName(this.repoPort, this.dbType);

    this.repoAdapterClassNameNode.buildLeafValue(repoAdapterName);

    return this.repoAdapterClassNameNode;
  }
}
