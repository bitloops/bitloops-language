import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ObjectPropertyNode } from './ObjectPropertyNode.js';

export class ObjectPropertyListNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'objectPropertyList';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TObjectPropertyList, ObjectPropertyListNode.classNodeName, metadata);
  }

  get properties(): ObjectPropertyNode[] {
    return this.getChildren() as ObjectPropertyNode[];
  }

  public findPropertyByName(name: string): ObjectPropertyNode | undefined {
    return this.properties.find((property) => property.identifier.getIdentifierName() === name);
  }
}
