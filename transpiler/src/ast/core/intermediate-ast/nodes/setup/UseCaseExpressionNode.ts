import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ArgumentListNode } from '../ArgumentList/ArgumentListNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextModuleNode } from './BoundedContextModuleNode.js';

export class UseCaseExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'useCaseExpression';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseExpression, metadata, UseCaseExpressionNode.classNodeName);
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

  public getArgumentList(): ArgumentListNode {
    const argumentList = this.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );
    if (!argumentList) {
      throw new Error('Argument list not found');
    }
    return argumentList;
  }
}
