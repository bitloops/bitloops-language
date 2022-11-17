import { TBitloopsPrimaryType } from '../../../types.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { FieldNode } from '../nodes/FieldNode.js';
import { IBuilder } from './IBuilder.js';

export class FieldNodeBuilder implements IBuilder<FieldNode> {
  private type: TBitloopsPrimaryType;
  private name: string;
  private optional?: boolean;
  private fieldNode: FieldNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree) {
    this.fieldNode = new FieldNode();
    this.intermediateASTTree = intermediateASTTree;
    const classType = this.intermediateASTTree.getCurrentNodeClassType();
    this.fieldNode.setClassType(classType);
  }

  public withType(type: TBitloopsPrimaryType): FieldNodeBuilder {
    this.type = type;
    return this;
  }

  public withName(name: string): FieldNodeBuilder {
    this.name = name;
    return this;
  }

  public withOptional(optional: boolean): FieldNodeBuilder {
    this.optional = optional;
    return this;
  }

  public build(): FieldNode {
    this.fieldNode.setValue({ type: this.type, name: this.name, optional: this.optional });

    return this.fieldNode;
  }
}
