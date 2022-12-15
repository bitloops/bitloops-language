import { ParameterListNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/ParameterList/ParameterListNodeBuilder.js';
import { ParameterListNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterListNode.js';
import { ParameterNode } from '../../../../../src/ast/core/intermediate-ast/nodes/ParameterList/ParameterNode.js';

export class ParameterListBuilderDirector {
  private builder: ParameterListNodeBuilder;

  constructor() {
    this.builder = new ParameterListNodeBuilder(null);
  }
  buildParams(...params: ParameterNode[]): ParameterListNode {
    return this.builder.withParameters(params).build();
  }
}
