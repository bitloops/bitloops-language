import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DomainServiceNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainService;
  private static classNodeName = 'domainService';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainServiceNode.classType,
      nodeType: BitloopsTypesMapping.TDomainService,
      metadata,
      classNodeName: DomainServiceNode.classNodeName,
    });
  }
}
