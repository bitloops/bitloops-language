import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ArgumentListNode } from '../ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../controllers/restController/RESTControllerIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ApiDeclarationNode } from './Api/ApiDeclarationNode.js';

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

  public getApi(): ApiDeclarationNode {
    const apiNode = this.getChildNodeByType<ApiDeclarationNode>(
      BitloopsTypesMapping.TApiDeclaration,
    );
    if (!apiNode) {
      throw new Error('Api not found');
    }
    return apiNode;
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
