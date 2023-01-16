import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionExpressionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { DatabaseTypeNode } from './DatabaseTypeNode.js';
import { RepoConnectionOptionsNode } from './RepoConnectionOptionsNode.js';

export class RepoConnectionExpressionNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionExpressionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionExpression,
      metadata,
      RepoConnectionExpressionNode.classNodeName,
    );
  }

  public getDatabase(): DatabaseTypeNode {
    const database = this.getChildNodeByType<DatabaseTypeNode>(
      BitloopsTypesMapping.TRepoDatabaseType,
    );
    if (!database) {
      throw new Error('Database not found');
    }
    return database;
  }

  public getOptions(): RepoConnectionOptionsNode {
    const database = this.getChildNodeByType<RepoConnectionOptionsNode>(
      BitloopsTypesMapping.TRepoConnectionOptions,
    );
    if (!database) {
      throw new Error('Repo connection options not found');
    }
    return database;
  }
}
