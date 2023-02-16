import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

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
}
