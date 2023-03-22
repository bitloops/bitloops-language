import { FieldListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/FieldList/FieldListNodeBuilder.js';
import { FieldListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldListNode.js';
import { FieldNode } from '../../../../../src/ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';

export class FieldListBuilderDirector {
  private builder: FieldListNodeBuilder;

  constructor() {
    this.builder = new FieldListNodeBuilder();
  }
  withFields(fields: FieldNode[]): FieldListNode {
    return this.builder.withFields(fields).build();
  }
}
