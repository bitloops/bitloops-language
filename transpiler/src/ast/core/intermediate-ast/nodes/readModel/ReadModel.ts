import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ReadModelKey } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ReadModelIdentifierNode } from './ReadModelIdentifierNode.js';

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
  public getIdentifier(): ReadModelIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TReadModelIdentifier,
    ) as ReadModelIdentifierNode;
    return identifier;
  }
}
