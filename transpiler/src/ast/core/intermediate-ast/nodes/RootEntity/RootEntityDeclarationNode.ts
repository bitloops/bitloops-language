import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { RootEntityKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class RootEntityDeclalationNode extends ClassTypeNode {
  private static classType = ClassTypes.RootEntity;
  private static classNodeName = RootEntityKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RootEntityDeclalationNode.classType,
      nodeType: BitloopsTypesMapping.TRootEntity,
      metadata,
      classNodeName: RootEntityDeclalationNode.classNodeName,
    });
  }
}
