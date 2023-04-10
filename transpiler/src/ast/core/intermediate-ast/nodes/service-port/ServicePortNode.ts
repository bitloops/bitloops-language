import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { MethodDefinitionListNode } from '../method-definitions/MethodDefinitionListNode.js';
import { ReturnOkErrorTypeNode } from '../returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ServicePortIdentifierNode } from './ServicePortIdentifierNode.js';

export class ServicePortNode extends ClassTypeNode {
  private static classType = ClassTypes.ServicePort;
  private static classNodeName = 'ServicePort';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ServicePortNode.classType,
      nodeType: BitloopsTypesMapping.TServicePort,
      metadata,
      classNodeName: ServicePortNode.classNodeName,
    });
  }
  public getIdentifier(): ServicePortIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TServicePortIdentifier,
    ) as ServicePortIdentifierNode;
    return identifier;
  }

  public getReturnOkErrorTypeNodes(): ReturnOkErrorTypeNode[] {
    const methodDefinitionListNode = this.getChildNodeByType<MethodDefinitionListNode>(
      BitloopsTypesMapping.TDefinitionMethods,
    );
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
