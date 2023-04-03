import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../method-definitions/MethodDefinitionListNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { RepoPortIdentifierNode } from './RepoPortIdentifierNode.js';

export class RepoPortNode extends ClassTypeNode {
  private static classType = ClassTypes.RepoPort;
  private static classNodeName = 'RepoPort';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RepoPortNode.classType,
      nodeType: BitloopsTypesMapping.TRepoPort,
      metadata,
      classNodeName: RepoPortNode.classNodeName,
    });
  }

  public getIdentifier(): IdentifierNode {
    return this.getChildNodeByType<RepoPortIdentifierNode>(
      BitloopsTypesMapping.TRepoPortIdentifier,
    );
  }

  public getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[] {
    const methodDefinitionListNode = this.getChildNodeByType<MethodDefinitionListNode>(
      BitloopsTypesMapping.TDefinitionMethods,
    );
    if (!methodDefinitionListNode) {
      return [];
    }
    const returnOkErrorTypeNodes: ReturnOkErrorTypeNode[] = [];
    const methodDefinitionNodes = methodDefinitionListNode.getMethodDefinitionNodes();
    for (const methodDefinitionNode of methodDefinitionNodes) {
      const returnOkErrorTypeNode = methodDefinitionNode.getReturnOkErrorTypeNode();
      if (!returnOkErrorTypeNode) {
        continue;
      }
      returnOkErrorTypeNodes.push(returnOkErrorTypeNode);
    }
    return returnOkErrorTypeNodes;
  }
}
