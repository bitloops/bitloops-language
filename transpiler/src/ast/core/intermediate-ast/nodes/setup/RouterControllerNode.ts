import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ArgumentListNode } from '../ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../controllers/restController/RESTControllerIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextModuleNode } from './BoundedContextModuleNode.js';

export class RouterControllerNode extends IntermediateASTNode {
  private static classNodeName = 'routerController';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterController, metadata, RouterControllerNode.classNodeName);
  }

  public getRouterControllerIdentifier(): RESTControllerIdentifierNode {
    const children = this.getChildren();
    const controllerIdentifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TRESTControllerIdentifier,
    );
    if (!controllerIdentifier) {
      throw new Error('Router controller identifier not found');
    }
    return controllerIdentifier as RESTControllerIdentifierNode;
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
