import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ObjectPropertyNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'objectProperty';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TObjectProperty, ObjectPropertyNode.classNodeName, metadata);
  }

  get identifier(): IdentifierNode {
    return this.getChildren()[0] as IdentifierNode;
  }

  get expression(): ExpressionNode {
    return this.getChildren()[1] as ExpressionNode;
  }
}
