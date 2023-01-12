import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DTONode extends ClassTypeNode {
  private static classType = ClassTypes.DTO;
  private static classNodeName = 'DTO';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DTONode.classType,
      nodeType: BitloopsTypesMapping.TDTO,
      metadata,
      classNodeName: DTONode.classNodeName,
    });
  }
}
