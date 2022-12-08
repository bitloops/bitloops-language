import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ReadModelKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ReadModelNode extends ClassTypeNode {
  private static classType = ClassTypes.ReadModel;
  private static nodeType = BitloopsTypesMapping.TReadModel;
  private static classNodeName = ReadModelKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ReadModelNode.classType,
      nodeType: ReadModelNode.nodeType,
      metadata,
      classNodeName: ReadModelNode.classNodeName,
    });
  }
}
