import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { TBitloopsPrimaryType } from '../../../types.js';
import { FieldNode } from '../nodes/FieldNode.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { IBuilder } from './IBuilder.js';

export class FieldNodeBuilder implements IBuilder<FieldNode> {
  public readonly NAME = 'field';

  private typeNode: TypeNode;
  private identifierNode: IdentifierNode;
  private optionalNode?: OptionalNode;
  private fieldNode: FieldNode;

  constructor() {
    this.fieldNode = new FieldNode();
  }

  public withType(type: TBitloopsPrimaryType): FieldNodeBuilder {
    this.typeNode = new TypeNode(type);
    return this;
  }

  public withName(name: string): FieldNodeBuilder {
    this.identifierNode = new IdentifierNode(name);
    return this;
  }

  public withOptional(optional: boolean): FieldNodeBuilder {
    this.optionalNode = new OptionalNode(optional);
    return this;
  }

  public build(): FieldNode {
    this.fieldNode.addChild(this.typeNode);
    this.fieldNode.addChild(this.identifierNode);
    if (this.optionalNode) this.fieldNode.addChild(this.optionalNode);

    this.fieldNode.buildObjectValue();

    return this.fieldNode;
  }
}

export class TypeNode extends IntermediateASTNode {
  public readonly NAME = 'type';

  constructor(type: TBitloopsPrimaryType, lines?: string) {
    super(BitloopsTypesMapping.TBitloopsPrimaryType, lines);
    this.setName(this.NAME);
    this.setValue(type);
  }
}

export class IdentifierNode extends IntermediateASTNode {
  public readonly NAME = 'identifier';

  constructor(name: string, lines?: string) {
    super(BitloopsTypesMapping.TIdentifier, lines);
    this.setName(this.NAME);
    this.setValue(name);
  }
}

export class OptionalNode extends IntermediateASTNode {
  public readonly NAME = 'optional';

  constructor(optional: boolean, lines?: string) {
    super(BitloopsTypesMapping.TOptional, lines);
    this.setName(this.NAME);
    this.setValue(optional);
  }
}
