import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterExpressionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../BoundedContextModuleNode.js';
import { ConcretedRepoPortNode } from './ConcretedRepoPortNode.js';
import { DatabaseTypeNode } from './DatabaseTypeNode.js';
import { RepoAdapterOptionsNode } from './RepoAdapterOptionsNode.js';
import { RepoConnectionExpressionNode } from './RepoConnectionExpressionNode.js';

export class RepoAdapterExpressionNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterExpressionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterExpression,
      metadata,
      RepoAdapterExpressionNode.classNodeName,
    );
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

  public getOptions(): RepoAdapterOptionsNode {
    const repoAdapterOptions = this.getChildNodeByType<RepoAdapterOptionsNode>(
      BitloopsTypesMapping.TRepoAdapterOptions,
    );
    if (!repoAdapterOptions) {
      throw new Error('Repo adapter options not found');
    }
    return repoAdapterOptions;
  }

  public getDBType(): DatabaseTypeNode {
    const dbType = this.getChildNodeByType<DatabaseTypeNode>(
      BitloopsTypesMapping.TRepoDatabaseType,
    );
    if (!dbType) {
      throw new Error('Repo adapter database not found');
    }
    return dbType;
  }

  public getConcretedRepoPort(): ConcretedRepoPortNode {
    const concretedRepoPort = this.getChildNodeByType<ConcretedRepoPortNode>(
      BitloopsTypesMapping.TConcretedRepoPort,
    );
    if (!concretedRepoPort) {
      throw new Error('Concreted repo port not found');
    }
    return concretedRepoPort;
  }

  public getConnectionInfo(): RepoConnectionExpressionNode {
    const connectionInfo = this.getChildNodeByType<RepoConnectionExpressionNode>(
      BitloopsTypesMapping.TRepoConnectionExpression,
    );
    if (!connectionInfo) {
      throw new Error('Connection info not found');
    }
    return connectionInfo;
  }
}
