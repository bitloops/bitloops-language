import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { RootEntityKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class RootEntityDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.RootEntity;
  private static classNodeName = RootEntityKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: RootEntityDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TRootEntity,
      metadata,
      classNodeName: RootEntityDeclarationNode.classNodeName,
    });
  }
}
