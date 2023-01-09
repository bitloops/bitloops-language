import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ArgumentListNode } from '../ArgumentList/ArgumentListNode.js';
import { RESTControllerIdentifierNode } from '../controllers/restController/RESTControllerIdentifierNode.js';
import { RESTServerTypeNode } from '../controllers/restController/RESTServerTypeNode.js';
import { StringLiteralNode } from '../Expression/Literal/StringLiteralNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { BoundedContextModuleNode } from './BoundedContextModuleNode.js';
import { HTTPMethodVerbNode } from './HTTPMethodVerbNode.js';

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

  public getServerType(): RESTServerTypeNode {
    const serverType = this.getChildNodeByType<RESTServerTypeNode>(
      BitloopsTypesMapping.TServerType,
    );
    if (!serverType) {
      throw new Error('Rest Server type not found');
    }
    return serverType;
  }

  public getMethodNode(): HTTPMethodVerbNode {
    const restMethodNode = this.getChildNodeByType<HTTPMethodVerbNode>(
      BitloopsTypesMapping.THTTPMethodVerb,
    );
    if (!restMethodNode) {
      throw new Error('Rest Server methodNode found');
    }
    return restMethodNode;
  }

  public getPathNode(): StringLiteralNode {
    const parameterListNode = this.getChildNodeByType<StringLiteralNode>(
      BitloopsTypesMapping.TStringLiteral,
    );
    if (!parameterListNode) {
      throw new Error('Rest Server pathNode not found');
    }
    return parameterListNode;
  }

  public getArgumentsNode(): ArgumentListNode {
    const parameterListNode = this.getChildNodeByType<ArgumentListNode>(
      BitloopsTypesMapping.TArgumentList,
    );
    if (!parameterListNode) {
      throw new Error('Rest Server Argmument list not found');
    }
    return parameterListNode;
  }
}
