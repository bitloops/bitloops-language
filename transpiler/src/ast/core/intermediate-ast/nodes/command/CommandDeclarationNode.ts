import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class CommandDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.Command;
  private static classNodeName = 'Command';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: CommandDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TCommand,
      metadata,
      classNodeName: CommandDeclarationNode.classNodeName,
    });
  }
}
