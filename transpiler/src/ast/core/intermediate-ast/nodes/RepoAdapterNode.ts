import { ClassTypes, BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { repoAdapterKey } from '../../../../types.js';
import { ClassTypeNode } from './ClassTypeNode.js';
import { IdentifierNode } from './identifier/IdentifierNode.js';
import { TNodeMetadata } from './IntermediateASTNode.js';
import { RepoAdapterExpressionNode } from './setup/repo/RepoAdapterExpressionNode.js';

export class RepoAdapterNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoAdapter;
  private static classNodeName = repoAdapterKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoAdapterNode.classType,
      nodeType: BitloopsTypesMapping.TRepoAdapter,
      metadata,
      classNodeName: RepoAdapterNode.classNodeName,
    });
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Repo adapter identifier not found');
    }
    return identifier;
  }

  public getExpression(): RepoAdapterExpressionNode {
    const repoAdapterExpression = this.getChildNodeByType<RepoAdapterExpressionNode>(
      BitloopsTypesMapping.TRepoAdapterExpression,
    );
    if (!repoAdapterExpression) {
      throw new Error('Repo adapter expression not found');
    }
    return repoAdapterExpression;
  }
}
