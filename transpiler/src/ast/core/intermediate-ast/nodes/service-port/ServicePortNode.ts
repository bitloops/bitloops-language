import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
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
}
